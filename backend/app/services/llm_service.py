import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from pydantic import BaseModel, Field
from typing import List
 
class DocumentSummary(BaseModel):
    summary_text: str = Field(description="The summary of the document content")
    key_points: List[str] = Field(description="3 to 5 key bullet points")
    improvement_suggestions: str = Field(description="Suggestions on document clarity or missing context")

 
text_llm = ChatGroq(
    model="openai/gpt-oss-20b", 
    api_key=os.getenv("GROQ_API_KEY")
).with_structured_output(DocumentSummary)

 
vision_llm = ChatGroq(
    model="llama-3.2-11b-vision-preview",
    api_key=os.getenv("GROQ_API_KEY")
).with_structured_output(DocumentSummary)

def generate_text_summary(text: str, length: str) -> DocumentSummary:
    """Sends extracted PDF text to Groq."""
    prompt = f"""
    You are an expert document analyzer. Read the text below and extract the information into the required structure.
    
    CRITICAL INSTRUCTIONS - You MUST provide ALL THREE of the following fields:
    1. summary_text: A {length} summary of the document content.
    2. key_points: 3 to 5 key bullet points.
    3. improvement_suggestions: Suggestions for document clarity or missing context.

    Text to analyze:
    {text}
    """
    return text_llm.invoke(prompt)

def generate_image_summary(base64_image: str, mime_type: str, length: str) -> DocumentSummary:
    """Sends the base64 image directly to Groq Vision."""
    prompt_text = f"""
    You are an expert document analyzer. Read the text in this image and extract the information into the required structure.
    
    CRITICAL INSTRUCTIONS - You MUST provide ALL THREE of the following fields:
    1. summary_text: A {length} summary of the document content.
    2. key_points: 3 to 5 key bullet points.
    3. improvement_suggestions: Suggestions for document clarity or missing context.
    """
    
    message = HumanMessage(
        content=[
            {"type": "text", "text": prompt_text},
            {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{base64_image}"}}
        ]
    )
    return vision_llm.invoke([message])
import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List
import re


class DocumentSummary(BaseModel):
    summary_text: str = Field(description="The summary of the document content")
    key_points: List[str] = Field(description="3 to 5 key bullet points")
    improvement_suggestions: str = Field(description="Suggestions on document clarity or missing context")

 
text_llm = ChatGroq(
    model="openai/gpt-oss-20b", 
    api_key=os.getenv("GROQ_API_KEY")
).with_structured_output(DocumentSummary)


parser = JsonOutputParser(pydantic_object=DocumentSummary)
 
vision_llm = ChatGroq(
    model="qwen/qwen3.6-27b",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)

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

def generate_image_summary(base64_image: str, mime_type: str, length: str) -> dict:
    """Constructs the data URL from the raw base64 string and sends it to Groq Vision."""
     
    prompt_text = f"""
    You are an elite Vision-Language AI. Read the text and interpret the structure within the provided document image.
    
    TASK: Provide a {length} summary, extract key points, and suggest improvements based on the image content.
    
    ABSOLUTE FORMATTING RULES (FAILURE IS NOT AN OPTION):
    1. {parser.get_format_instructions()}
    2. OUTPUT ONLY RAW, VALID JSON. 
    3. DO NOT wrap the JSON in markdown blocks (e.g., no ```json).
    4. DO NOT include any introductory or concluding text (e.g., "Here is the JSON...").
    5. DO NOT generate reasoning traces, inner monologues, or <think> tags. Start your response immediately with the opening bracket {{.
    """
    
    image_url = f"data:{mime_type};base64,{base64_image}"
    
    message = HumanMessage(
        content=[
            {"type": "text", "text": prompt_text},
            {"type": "image_url", "image_url": {"url": image_url}}
        ]
    )
    
    response = vision_llm.invoke([message])
     
    cleaned_text = re.sub(r'<think>.*?</think>', '', response.content, flags=re.DOTALL).strip()
    
    return parser.invoke(cleaned_text)
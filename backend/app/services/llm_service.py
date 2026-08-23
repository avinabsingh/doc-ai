import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from pydantic import BaseModel, Field
from typing import List

# 1. Define the exact JSON structure we want back
class DocumentSummary(BaseModel):
    summary_text: str = Field(description="The summary of the document content")
    key_points: List[str] = Field(description="3 to 5 key bullet points")
    improvement_suggestions: str = Field(description="Suggestions on document clarity or missing context")

# 2. Initialize the standard Groq model for Text (PDFs)
text_llm = ChatGroq(
    model="llama3-8b-8192", # Fast and efficient for text
    api_key=os.getenv("GROQ_API_KEY")
).with_structured_output(DocumentSummary)

# 3. Initialize the Groq Vision model for Images
vision_llm = ChatGroq(
    model="llama-3.2-11b-vision-preview",
    api_key=os.getenv("GROQ_API_KEY")
).with_structured_output(DocumentSummary)

def generate_text_summary(text: str, length: str) -> DocumentSummary:
    """Sends extracted PDF text to Groq."""
    prompt = f"Analyze the following text and provide a {length} summary, key points, and suggestions.\n\nText: {text}"
    return text_llm.invoke(prompt)

def generate_image_summary(base64_image: str, mime_type: str, length: str) -> DocumentSummary:
    """Sends the base64 image directly to Groq Vision."""
    # Create the Multimodal message for LangChain
    message = HumanMessage(
        content=[
            {"type": "text", "text": f"Read the text in this image and provide a {length} summary, key points, and suggestions."},
            {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{base64_image}"}}
        ]
    )
    return vision_llm.invoke([message])
import fitz  # PyMuPDF
import base64
from fastapi import UploadFile

async def parse_pdf(file: UploadFile) -> str:
    """Extracts text from a PDF file using PyMuPDF."""
    text = ""
    # Read the uploaded file into memory
    file_bytes = await file.read()
    
    # Open the PDF from the memory buffer
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
            
    return text

async def encode_image(file: UploadFile) -> str:
    """Encodes an image to a Base64 string for Groq Vision."""
    file_bytes = await file.read()
    # Convert to base64 and decode to string
    return base64.b64encode(file_bytes).decode("utf-8")
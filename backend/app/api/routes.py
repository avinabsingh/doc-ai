from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.llm_service import generate_text_summary, generate_image_summary

router = APIRouter()

# Define the expected JSON payload from the React frontend
class DocumentRequest(BaseModel):
    type: str     # "text" or "image"
    content: str  # The raw extracted text OR the Base64 image string
    length: str

@router.post("/upload")
async def upload_document(request: DocumentRequest):
    try:
        #   PDF Text
        if request.type == "text":
            if not request.content.strip():
                raise HTTPException(status_code=400, detail="No text provided.")
            return generate_text_summary(request.content, request.length)
            
        #   Base64 Image
        elif request.type == "image": 
            header, base64_data = request.content.split(",", 1)
            mime_type = header.split(":")[1].split(";")[0]
             
            return generate_image_summary(base64_data, mime_type, request.length)
            
        else:
            raise HTTPException(status_code=400, detail="Invalid request type.")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
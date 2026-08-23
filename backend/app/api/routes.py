from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.document_parser import parse_pdf, encode_image
from app.services.llm_service import generate_text_summary, generate_image_summary

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...), 
    length: str = Form("medium") # Default to medium if not provided
):
    try:
        content_type = file.content_type
         
        if content_type == "application/pdf": 
            extracted_text = await parse_pdf(file)
            if not extracted_text.strip():
                raise HTTPException(status_code=400, detail="Could not extract text from PDF (it might be scanned).")
            
            
            result = generate_text_summary(extracted_text, length)
            return result
            
        #  Image Files  
        elif content_type in ["image/jpeg", "image/png", "image/jpg"]: 
            base64_image = await encode_image(file)
             
            result = generate_image_summary(base64_image, content_type, length)
            return result
             
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {content_type}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
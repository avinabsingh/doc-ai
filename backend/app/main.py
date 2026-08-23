import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
 
load_dotenv()

from app.api.routes import router
 
app = FastAPI(
    title="DOC-AI API", 
)
origins = [
    "http://localhost:5173",             # Local development
    "https://doc-ai-coral.vercel.app"    # Your live Vercel frontend
]
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)
 
app.include_router(router, prefix="/api/v1")

 
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
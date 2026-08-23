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
    allow_origins=["*"],  # Allows requests from any origin (including all Vercel preview URLs)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
app.include_router(router, prefix="/api/v1")

 
@app.get("/")
async def root():
    return {"status": "ok", "message": "DOC-AI API is running successfully!"}
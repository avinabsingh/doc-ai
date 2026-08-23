# DocuMind - Document Summary Assistant

DocuMind is a document analysis application that helps users turn complex PDFs and scanned documents into clear, structured summaries.

It uses React on the frontend and FastAPI on the backend, with LangChain and Groq Llama models for document analysis. The application provides summaries, key points, and suggestions based on the uploaded document.

## Live Demo

Frontend:

Backend:

## Features

- Upload and analyze PDF documents and scanned images
- Extract text from documents for analysis
- Generate short, medium, or detailed summaries
- Get structured key points from the document
- Receive suggestions and actionable insights
- Copy generated results to the clipboard
- Export the analysis as a Markdown file
- Responsive interface for desktop and mobile

## Architecture

DocuMind follows a simple client-server architecture.

1. The user uploads a document through the React frontend.
2. The frontend extracts the document content where possible.
3. The extracted content is sent to the FastAPI backend.
4. LangChain sends the content to the Groq Llama model for analysis.
5. The response is validated using Pydantic.
6. The structured result is returned to the frontend and displayed to the user.

```text
Document Upload
       │
       ▼
React Frontend
       │
       ▼
Text Extraction / OCR
       │
       ▼
FastAPI Backend
       │
       ▼
LangChain
       │
       ▼
Groq Llama Model
       │
       ▼
Pydantic Validation
       │
       ▼
Summary, Key Points & Suggestions
```

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- pdfjs-dist
- Lucide React

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### AI & Document Processing

- LangChain
- Groq API
- Llama Models
- PyMuPDF
- Pillow
- Tesseract OCR

## Project Structure

```text
doc-ai/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md

```

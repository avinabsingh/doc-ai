from pydantic import BaseModel, Field
from typing import List

class DocumentSummary(BaseModel):
    summary_text: str = Field(description="The summary of the document content")
    key_points: List[str] = Field(description="3 to 5 key bullet points extracted from the text")
    improvement_suggestions: str = Field(description="Suggestions on document clarity or missing context")
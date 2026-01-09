# app/services/ai/schemas.py

from pydantic import BaseModel
from typing import Optional


class AICategorizationResult(BaseModel):
    category_name: str
    confidence: float
    reasoning: Optional[str] = None

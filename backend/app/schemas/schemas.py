# app/schemas/schemas.py

from pydantic import BaseModel
from typing import List, Optional, Any
from enum import Enum

# --- Enums ---
class SentimentType(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"

# --- Analysis Schemas ---
class PredictionPoint(BaseModel):
    date: str
    price: float
    type: str # 'history' or 'forecast'
    confidence_lower: Optional[float] = None
    confidence_upper: Optional[float] = None

class MetricCard(BaseModel):
    current_price: float
    predicted_price_30d: float
    growth_percentage: float
    risk_score: float

class NewsItem(BaseModel):
    title: str
    source: str
    sentiment: SentimentType
    score: float

class AnalysisResponse(BaseModel):
    symbol: str
    graph_data: List[PredictionPoint]
    metrics: MetricCard
    news: List[NewsItem]

# --- Chat Schemas ---
class ChatRequest(BaseModel):
    user_id: str
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
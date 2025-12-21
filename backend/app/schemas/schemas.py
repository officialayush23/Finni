# app/schemas/schemas.py

from pydantic import BaseModel
from typing import List, Optional, Any
from enum import Enum
from uuid import UUID
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
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str

# --- User Profile ---

class UserProfileCreate(BaseModel):
    full_name: Optional[str]
    phone: Optional[str]
    preferences: Optional[dict] = {}
    metadata: Optional[dict] = {}

class UserProfileResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str]
    phone: Optional[str]
    preferences: dict
    metadata: dict

# --- Income ---

class IncomeCreate(BaseModel):
    name: str
    source_type: str
    rate_type: str = "fixed"
    estimated_monthly_amount: float

class IncomeResponse(IncomeCreate):
    id: str
    is_active: bool

# --- Investments ---

class InvestmentCreate(BaseModel):
    asset_type: str
    identifier: str
    name: Optional[str]
    quantity: float
    avg_buy_price: float

class InvestmentResponse(InvestmentCreate):
    id: str
    current_value: Optional[float]


class BudgetCreate(BaseModel):
    category_id: UUID
    limit_amount: float
    period: Optional[str] = "monthly"   # monthly | weekly | yearly
    alert_threshold: Optional[float] = 80.0


class BudgetResponse(BaseModel):
    id: str
    category_id: str
    limit_amount: float
    period: str
    alert_threshold: float
    is_active: bool
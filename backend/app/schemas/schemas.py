# app/schemas/schemas.py

from pydantic import BaseModel
from typing import List, Optional, Any,Dict, Union
from enum import Enum
from uuid import UUID
from datetime import datetime,date

# --- Enums ---
class IncomeRead(BaseModel):
    id: str
    name: str
    estimated_monthly_amount: float
    rate_type: str
    ai_source_identifier: Optional[str] = None
class BudgetMetadata(BaseModel):
    included_category_ids: list[str]
    excluded_category_ids: list[str] = []
    excluded_merchants: list[str] = []

class InvestmentRead(BaseModel):
    id: str
    asset_type: str
    identifier: Optional[str] = None
    name: str
    current_value: Optional[float]
    expected_return_pct: Optional[float]
    pinned: bool
    last_api_fetch: Optional[str]


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
    message: str | dict
    session_id: str
    action: Optional[str] = None
    data: Optional[dict] = None


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
    incomes: list[IncomeRead]
    investments: list[InvestmentRead]


# --- Income ---

# --- Income ---

class IncomeCreate(BaseModel):
    name: str
    source_type: str            # salary | business | rental | dividend | interest
    rate_type: str              # fixed | market_linked | api_driven
    estimated_monthly_amount: float
    api_source_identifier: Optional[str] = None


class IncomeUpdate(BaseModel):
    estimated_monthly_amount: Optional[float] = None
    is_active: Optional[bool] = None


class IncomeResponse(BaseModel):
    id: str
    name: str
    source_type: str
    rate_type: str
    estimated_monthly_amount: float
    is_active: bool


# --- Investments ---

# --- Investments ---

class InvestmentCreate(BaseModel):
    asset_type: str              # stock | mutual_fund | crypto
    identifier: str              # Ticker / MF code / contract
    name: Optional[str] = None
    quantity: float
    avg_buy_price: float
    expected_annual_return: Optional[float] = None
    risk_level: Optional[str] = None
    is_pinned: bool = False


class InvestmentUpdate(BaseModel):
    quantity: Optional[float] = None
    avg_buy_price: Optional[float] = None
    expected_annual_return: Optional[float] = None
    risk_level: Optional[str] = None
    is_pinned: Optional[bool] = None


class InvestmentResponse(BaseModel):
    id: str
    asset_type: str
    identifier: Optional[str] = None
    name: Optional[str]
    quantity: float
    avg_buy_price: float
    current_value: Optional[float]
    last_api_fetch: Optional[str]
    expected_annual_return: Optional[float]
    risk_level: Optional[str]
    is_pinned: bool




class BudgetCreate(BaseModel):
    name: str
    limit_amount: float
    period: str  # daily | weekly | monthly
    metadata: BudgetMetadata
    alert_threshold: float = 80



class BudgetResponse(BaseModel):
    id: str
    name: str
    limit_amount: float
    period: str
    alert_threshold: float
    is_active: bool
    spent: float
    remaining: float
    percentage_used: float


class TransactionSource(str, Enum):
    manual = "manual"
    voice = "voice"
    chatbot = "chatbot"
    csv = "csv"
    notification = "notification"
    wallet = "wallet"
    blockchain = "blockchain"
class TransactionCreate(BaseModel):
    amount: float
    currency: str = "INR"
    occurred_at: datetime
    category_id: Optional[UUID]=None
    merchant_raw: Optional[str] = None
    description: Optional[str] = None
    source: TransactionSource = TransactionSource.manual # manual | voice | ocr | notification

    

# --- Budgets ---




class BudgetUpdate(BaseModel):
    name: Optional[str] = None
    limit_amount: Optional[float] = None
    period: Optional[str] = None
    included_category_ids: Optional[list[str]] = None
    excluded_category_ids: Optional[list[str]] = None
    excluded_merchants: Optional[list[str]] = None
    alert_threshold: Optional[float] = None



class TransactionResponse(BaseModel):
    id: str
    amount: float
    currency: str
    occurred_at: datetime
    category_id: str
    merchant_raw: Optional[str]
    description: Optional[str]
    source: TransactionSource 


class TransactionUpdate(BaseModel):
    amount: Optional[float] = None
    currency: Optional[str] = None
    occurred_at: Optional[datetime] = None
    category_id: Optional[UUID] = None
    merchant_raw: Optional[str] = None
    description: Optional[str] = None
    source: Optional[str] = None


class IncomeOnboarding(BaseModel):
    name: str
    yearly_amount: float


class InvestmentOnboarding(BaseModel):
    asset_type: str
    identifier: str
    name: str
    current_value: float
    expected_return_pct: float
    pinned: bool = False


class BudgetPrefs(BaseModel):
    daily_food_budget: Optional[float] = None
    monthly_discretionary_budget: Optional[float] = None
    exclude_from_food: list[str] = []


class UserProfileOnboarding(BaseModel):
    full_name: str
    phone: Optional[str]
    currency: str = "INR"
    risk_profile: str  # conservative | moderate | aggressive


class UserOnboardingRequest(BaseModel):
    profile: UserProfileOnboarding
    incomes: List[IncomeOnboarding]
    investments: List[InvestmentOnboarding]
    budget_preferences: Optional[BudgetPrefs]


# --- User Profile ---






class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    preferences: Optional[dict] = None


class IngestEventCreate(BaseModel):
    sender: Optional[str] = None
    raw_text: str


class AICategorizationResult(BaseModel):
    merchant_name: str
    normalized_merchant: str
    category_id: str
    confidence: float
    signals: Dict[str, bool]
    explanation: str


# --- Goals ---

class GoalCreate(BaseModel):
    name: str
    target_amount: float
    target_date: date


class GoalUpdate(BaseModel):
    name: Optional[str] = None
    target_amount: Optional[float] = None
    target_date: Optional[date] = None
    status: Optional[str] = None


class GoalAllocationCreate(BaseModel):
    income_source_id: Optional[UUID] = None
    portfolio_holding_id: Optional[UUID] = None
    allocation_percentage: Optional[float] = None
    allocation_fixed_amount: Optional[float] = None
    allocation_type: str = "capital"  # capital | expected_return

class GoalOptimizationPlan(BaseModel):
    plan_id: str
    feasibility_score: float  # 0–100
    time_to_goal_months: int
    allocations: list[dict]
    tradeoffs: list[str]
    risks: list[str]
    recommendation: str

class GoalResponse(BaseModel):
    id: str
    name: str
    target_amount: float
    current_amount: float
    target_date: date
    status: str


# app/services/ai/actions.py
from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class AIAction(BaseModel):
    action: str = "none"
    confidence: float = 0.0

    # ---- Budget ----
    name: Optional[str] = None
    limit_amount: Optional[float] = None
    period: Optional[str] = None

    # ---- Transaction ----
    amount: Optional[float] = None
    merchant_raw: Optional[str] = None
    category_id: Optional[UUID] = None
    occurred_at: Optional[str] = None
    description: Optional[str] = None

    # ---- Goals ----
    goal_id: Optional[UUID] = None
    target_amount: Optional[float] = None
    target_date: Optional[str] = None

    # ---- Allocation ----
    income_source_id: Optional[UUID] = None
    portfolio_holding_id: Optional[UUID] = None
    allocation_percentage: Optional[float] = None
    allocation_fixed_amount: Optional[float] = None

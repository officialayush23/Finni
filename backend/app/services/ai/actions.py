# app/services/ai/actions.py
from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime


class AIBudgetAction(BaseModel):
    action: Literal["create_budget", "create_transaction", "create_goal", "allocate_goal", "none"]
    name: Optional[str] = None
    limit_amount: Optional[float] = None
    period: Optional[str] = None  # daily | weekly | monthly
    reasoning: Optional[str] = None
    
    # Transaction fields
    amount: Optional[float] = None
    merchant_raw: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[str] = None
    occurred_at: Optional[datetime] = None
    
    # Goal fields
    target_amount: Optional[float] = None
    target_date: Optional[str] = None  # ISO date string
    
    # Allocation fields
    goal_id: Optional[str] = None
    income_source_id: Optional[str] = None
    portfolio_holding_id: Optional[str] = None
    allocation_percentage: Optional[float] = None
    allocation_fixed_amount: Optional[float] = None
    
    # Confidence score for guardrails
    confidence: float = 0.5

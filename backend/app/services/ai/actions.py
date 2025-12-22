# app/services/ai/actions.py
from pydantic import BaseModel
from typing import Optional, Literal


class AIBudgetAction(BaseModel):
    action: Literal["create_budget", "none"]
    name: Optional[str]
    limit_amount: Optional[float]
    period: Optional[str]  # daily | weekly | monthly
    reasoning: Optional[str]

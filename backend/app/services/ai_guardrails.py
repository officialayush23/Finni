# app/services/ai_guardrails.py

from enum import Enum
from dataclasses import dataclass
from typing import Optional


class AIActionType(str, Enum):
    create_transaction = "create_transaction"
    create_budget = "create_budget"
    create_goal = "create_goal"
    allocate_goal = "allocate_goal"
    add_income = "add_income"
    add_investment = "add_investment"
    NONE = "none"




@dataclass
class AIAction:
    action: AIActionType
    confidence: float
    payload: Optional[dict] = None


def require_confirmation(action: AIAction) -> bool:
    return (
        action.action != AIActionType.NONE
        and action.confidence < 0.75
    )


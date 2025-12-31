# app/services/ai_guardrails.py

from enum import Enum
from dataclasses import dataclass
from typing import Optional


class AIActionType(str, Enum):
    NONE = "none"
    CREATE_BUDGET = "create_budget"
    CREATE_TRANSACTION = "create_transaction"
    ALLOCATE_GOAL = "allocate_goal"
    UPDATE_GOAL = "update_goal"


@dataclass
class AIAction:
    action: AIActionType
    confidence: float
    payload: Optional[dict] = None


def require_confirmation(action: AIAction) -> bool:
    return action.action != AIActionType.NONE and action.confidence < 0.75

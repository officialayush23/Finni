# app/services/ai_action_router.py

from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from datetime import datetime
import logging

from app.services.budget_actions import create_budget_from_ai
from app.services.transaction_service import create_transaction_from_ai
from app.services.goal_actions import create_goal_from_ai, allocate_goal_from_ai

logger = logging.getLogger(__name__)


class AIActionRouter:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def execute(self, user_id: UUID, action):
        """
        Execute an AI action.
        action can be AIBudgetAction or a dict-like object with action and fields.
        """
        action_type = action.action if hasattr(action, "action") else action.get("action")
        
        if action_type == "create_budget":
            name = getattr(action, "name", None) or action.get("name", "AI Suggested Budget")
            limit_amount = getattr(action, "limit_amount", None) or action.get("limit_amount")
            period = getattr(action, "period", None) or action.get("period", "monthly")
            
            if not limit_amount:
                raise ValueError("limit_amount is required for budget creation")
            
            return await create_budget_from_ai(
                db=self.db,
                user_id=user_id,
                name=name,
                limit_amount=limit_amount,
                period=period,
            )

        if action_type == "create_transaction":
            amount = getattr(action, "amount", None) or action.get("amount")
            merchant_raw = getattr(action, "merchant_raw", None) or action.get("merchant_raw")
            description = getattr(action, "description", None) or action.get("description")
            category_id = getattr(action, "category_id", None) or action.get("category_id")
            occurred_at = getattr(action, "occurred_at", None) or action.get("occurred_at")
            
            if not amount:
                raise ValueError("amount is required for transaction creation")
            
            # Parse occurred_at if it's a string
            if occurred_at and isinstance(occurred_at, str):
                occurred_at = datetime.fromisoformat(occurred_at.replace("Z", "+00:00"))
            
            # Parse category_id if it's a string UUID
            if category_id and isinstance(category_id, str):
                try:
                    category_id = UUID(category_id)
                except ValueError:
                    category_id = None
            
            return await create_transaction_from_ai(
                db=self.db,
                user_id=user_id,
                amount=float(amount),
                merchant_raw=merchant_raw,
                description=description,
                category_id=category_id,
                occurred_at=occurred_at,
                source="chatbot",
            )

        if action_type == "create_goal":
            name = getattr(action, "name", None) or action.get("name")
            target_amount = getattr(action, "target_amount", None) or action.get("target_amount")
            target_date = getattr(action, "target_date", None) or action.get("target_date")
            
            if not name or not target_amount or not target_date:
                raise ValueError("name, target_amount, and target_date are required for goal creation")
            
            # Parse target_date if it's a string
            from datetime import date
            if isinstance(target_date, str):
                target_date = date.fromisoformat(target_date)
            
            return await create_goal_from_ai(
                db=self.db,
                user_id=user_id,
                name=name,
                target_amount=float(target_amount),
                target_date=target_date,
            )

        if action_type == "allocate_goal":
            goal_id = getattr(action, "goal_id", None) or action.get("goal_id")
            income_source_id = getattr(action, "income_source_id", None) or action.get("income_source_id")
            portfolio_holding_id = getattr(action, "portfolio_holding_id", None) or action.get("portfolio_holding_id")
            allocation_percentage = getattr(action, "allocation_percentage", None) or action.get("allocation_percentage")
            allocation_fixed_amount = getattr(action, "allocation_fixed_amount", None) or action.get("allocation_fixed_amount")
            
            if not goal_id:
                raise ValueError("goal_id is required for goal allocation")
            
            # Parse UUIDs if they're strings
            if goal_id and isinstance(goal_id, str):
                goal_id = UUID(goal_id)
            if income_source_id and isinstance(income_source_id, str):
                income_source_id = UUID(income_source_id)
            if portfolio_holding_id and isinstance(portfolio_holding_id, str):
                portfolio_holding_id = UUID(portfolio_holding_id)
            
            return await allocate_goal_from_ai(
                db=self.db,
                goal_id=goal_id,
                income_source_id=income_source_id,
                portfolio_holding_id=portfolio_holding_id,
                allocation_percentage=float(allocation_percentage) if allocation_percentage else None,
                allocation_fixed_amount=float(allocation_fixed_amount) if allocation_fixed_amount else None,
                allocation_type="expected_return",
            )

        raise ValueError(f"Unsupported AI action: {action_type}")

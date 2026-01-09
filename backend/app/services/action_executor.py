from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from datetime import datetime
from app.models.all_models import TxnSourceEnum
from app.services.transaction_service import create_transaction
from app.services.budget_actions import create_budget_from_ai
from app.services.goal_actions import create_goal_from_ai, allocate_goal_from_ai


class ActionExecutor:
    """
    SINGLE MUTATION LAYER.
    All money / budgets / goals are created here.
    """

    def __init__(self, db: AsyncSession):
        self.db = db

    async def execute(self, user_id: UUID, action):
        action_type = action.action

        # ---------------- TRANSACTION ----------------
        if action_type == "create_transaction":
            if not action.amount:
                raise ValueError("amount is required")

            occurred_at = action.occurred_at
            if isinstance(occurred_at, str):
                occurred_at = datetime.fromisoformat(
                    occurred_at.replace("Z", "+00:00")
                )
            if not occurred_at:
                occurred_at = datetime.utcnow()

            return await create_transaction(
                db=self.db,
                user_id=user_id,
                amount=action.amount,
                occurred_at=occurred_at,
                merchant_raw=action.merchant_raw,
                description=action.description,
                category_id=action.category_id,
                source=TxnSourceEnum.chatbot,
            )

        # ---------------- BUDGET ----------------
        if action_type == "create_budget":
            if not action.limit_amount:
                raise ValueError("limit_amount is required")

            return await create_budget_from_ai(
                db=self.db,
                user_id=user_id,
                name=action.name or "AI Suggested Budget",
                limit_amount=action.limit_amount,
                period=action.period or "monthly",
            )

        # ---------------- GOAL ----------------
        if action_type == "create_goal":
            if not action.name or not action.target_amount or not action.target_date:
                raise ValueError("name, target_amount, target_date required")

            target_date = action.target_date
            if isinstance(target_date, str):
                from datetime import date
                target_date = date.fromisoformat(target_date)

            return await create_goal_from_ai(
                db=self.db,
                user_id=user_id,
                name=action.name,
                target_amount=action.target_amount,
                target_date=target_date,
            )

        # ---------------- GOAL ALLOCATION ----------------
        if action_type == "allocate_goal":
            if not action.goal_id:
                raise ValueError("goal_id required")

            return await allocate_goal_from_ai(
                db=self.db,
                goal_id=action.goal_id,
                income_source_id=action.income_source_id,
                portfolio_holding_id=action.portfolio_holding_id,
                allocation_percentage=action.allocation_percentage,
                allocation_fixed_amount=action.allocation_fixed_amount,
                allocation_type=getattr(action, "allocation_type", "expected_return"),
            )

        raise ValueError(f"Unsupported action: {action_type}")

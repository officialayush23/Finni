# app/services/ai_action_router.py

# app/services/ai_action_router.py

from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.services.budget_actions import create_budget_from_ai
from app.services.transaction_service import create_transaction_from_ai
from app.services.goal_actions import create_goal_from_ai, allocate_goal_from_ai

class AIActionRouter:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def execute(self, user_id: UUID, action):
        """
        action.action is a string enum detected by LLM
        action.payload contains parsed fields
        """

        if action.action == "create_budget":
            return await create_budget_from_ai(
                db=self.db,
                user_id=user_id,
                **action.payload,
            )

        if action.action == "create_transaction":
            return await create_transaction_from_ai(
                db=self.db,
                user_id=user_id,
                **action.payload,
            )

        if action.action == "create_goal":
            return await create_goal_from_ai(
                db=self.db,
                user_id=user_id,
                **action.payload,
            )

        if action.action == "allocate_goal":
            return await allocate_goal_from_ai(
                db=self.db,
                user_id=user_id,
                **action.payload,
            )

        raise ValueError(f"Unsupported AI action: {action.action}")

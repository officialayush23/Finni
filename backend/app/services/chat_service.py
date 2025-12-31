from google import genai
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import (
    ChatSession,
    ChatMessage,
    Transaction,
    Budget,
)
from app.core.config import settings
import uuid
from typing import Optional
from app.services.ai_guardrails import require_confirmation
from app.services.chat_memory import embed_chat_message
from app.services.websocket_manager import manager
from app.services.ai.budget_action import detect_budget_action
from app.services.budget_actions import create_budget_from_ai

client = genai.Client(api_key=settings.GEMINI_API_KEY)


class ChatService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def _get_or_create_session(
        self,
        user_id: uuid.UUID,
        session_id: Optional[str],
        message: str,
    ) -> uuid.UUID:
        if session_id:
            return uuid.UUID(session_id)

        new_session = ChatSession(
            user_id=user_id,
            session_name=message[:40],
        )
        self.db.add(new_session)
        await self.db.commit()
        await self.db.refresh(new_session)
        return new_session.id

    async def _get_recent_transactions(self, user_id: uuid.UUID):
        result = await self.db.execute(
            select(Transaction)
            .where(Transaction.user_id == user_id)
            .order_by(Transaction.occurred_at.desc())
            .limit(5)
        )
        return result.scalars().all()

    async def get_financial_context(self, user_id: uuid.UUID) -> str:
        txns = await self._get_recent_transactions(user_id)

        txn_lines = [
            f"- ₹{t.amount} at {t.merchant_raw or 'Unknown'}"
            for t in txns
        ] or ["- No recent transactions"]

        budgets = (
            await self.db.execute(
                select(Budget).where(Budget.user_id == user_id)
            )
        ).scalars().all()

        budget_lines = [
            f"- {b.name}: ₹{b.limit_amount} ({b.period})"
            for b in budgets
        ] or ["- No budgets set"]

        return (
            "Recent Transactions:\n"
            + "\n".join(txn_lines)
            + "\n\nBudgets:\n"
            + "\n".join(budget_lines)
        )

    async def process_message(
        self,
        user_id: uuid.UUID,
        message: str,
        session_id: Optional[str] = None,
    ) -> tuple[str, str]:

        session_uuid = await self._get_or_create_session(
            user_id=user_id,
            session_id=session_id,
            message=message,
        )

        # 🔹 Recent txns for action detection
        txns = await self._get_recent_transactions(user_id)
        txn_context = "\n".join(
            f"₹{t.amount} at {t.merchant_raw}" for t in txns
        ) or "No recent transactions"

        # 🔹 STEP 1: Detect action FIRST
        action = await detect_budget_action(message, txn_context)
        if require_confirmation(action):
            return (
                f"I think you want to **{action.action.value.replace('_', ' ')}**, "
                "but I need your confirmation. Please say **confirm**.",
                str(session_uuid),
            )

        if action.action == "create_budget":
            budget = await create_budget_from_ai(
                db=self.db,
                user_id=user_id,
                name=action.name or "AI Suggested Budget",
                limit_amount=action.limit_amount,
                period=action.period or "monthly",
            )

            answer = (
                f"✅ Budget **{budget.name}** created.\n"
                f"Limit: ₹{budget.limit_amount} ({budget.period})"
            )

            # Persist chat
            user_msg = ChatMessage(
                session_id=session_uuid,
                sender="user",
                content=message,
            )
            ai_msg = ChatMessage(
                session_id=session_uuid,
                sender="ai",
                content=answer,
            )

            self.db.add_all([user_msg, ai_msg])
            await self.db.commit()

            await embed_chat_message(self.db, user_msg)
            await embed_chat_message(self.db, ai_msg)

            # Realtime push
            await manager.broadcast_to_user(
                str(user_id),
                {
                    "type": "budget_created",
                    "data": {
                        "id": str(budget.id),
                        "name": budget.name,
                        "limit_amount": float(budget.limit_amount),
                        "period": budget.period,
                    },
                },
            )

            return answer, str(session_uuid)

        # 🔹 STEP 2: Normal chat response
        context = await self.get_financial_context(user_id)

        prompt = f"""
You are a personal AI financial assistant.

USER DATA:
{context}

QUESTION:
{message}

Give clear, actionable advice.
"""

        response = await client.aio.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )

        answer = response.text.strip()

        user_msg = ChatMessage(
            session_id=session_uuid,
            sender="user",
            content=message,
        )
        ai_msg = ChatMessage(
            session_id=session_uuid,
            sender="ai",
            content=answer,
        )

        self.db.add_all([user_msg, ai_msg])
        await self.db.commit()

        await embed_chat_message(self.db, user_msg)
        await embed_chat_message(self.db, ai_msg)

        return answer, str(session_uuid)

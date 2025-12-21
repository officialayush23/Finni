# app/services/chat_service.py
# app/services/chat_service.py

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
from app.services.chat_memory import embed_chat_message
# Initialize Gemini client (async-capable)
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
        """
        Fetch an existing chat session or create a new one.
        """
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

    async def get_financial_context(self, user_id: uuid.UUID) -> str:
        """
        Build a compact financial snapshot for LLM grounding.
        """
        # Recent transactions
        txn_result = await self.db.execute(
            select(Transaction)
            .where(Transaction.user_id == user_id)
            .order_by(Transaction.occurred_at.desc())
            .limit(5)
        )
        txns = txn_result.scalars().all()

        txn_lines = [
            f"- ₹{t.amount} at {t.merchant_raw or 'Unknown'}"
            for t in txns
        ] or ["- No recent transactions"]

        # Budgets
        budget_result = await self.db.execute(
            select(Budget).where(Budget.user_id == user_id)
        )
        budgets = budget_result.scalars().all()

        budget_lines = [
            f"- {b.limit_amount} INR limit"
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
        """
        Core chat flow:
        - session handling
        - context gathering
        - Gemini call
        - persistence
        """

        # 1. Session
        session_uuid = await self._get_or_create_session(
            user_id=user_id,
            session_id=session_id,
            message=message,
        )

        # 2. Context
        context = await self.get_financial_context(user_id)

        # 3. Prompt
        prompt = f"""
You are a personal AI financial assistant.

Use the user's real financial data below.
Be precise, concise, and practical.

USER DATA:
{context}

USER QUESTION:
{message}

Answer with actionable advice.
"""

        # 4. Gemini async call
        response = await client.aio.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )

        answer = response.text.strip()

        # 5. Persist messages
        self.db.add_all(
            [
                ChatMessage(
                    session_id=session_uuid,
                    sender="user",
                    content=message,
                ),
                ChatMessage(
                    session_id=session_uuid,
                    sender="ai",
                    content=answer,
                ),
            ]
        )
        await self.db.commit()
        await embed_chat_message(self.db, user_msg)
        await embed_chat_message(self.db, ai_msg)

        return answer, str(session_uuid)

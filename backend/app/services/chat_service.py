# app/services/chat_service.py

import google.genai
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import ChatSession, ChatMessage, Transaction, Budget
from app.core.config import settings
import uuid

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

class ChatService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_financial_context(self, user_id: uuid.UUID) -> str:
        """Fetch user's financial snapshot for the LLM"""
        # 1. Get recent transactions
        result = await self.db.execute(select(Transaction).filter(Transaction.user_id == user_id).limit(5))
        txns = result.scalars().all()
        txn_str = "\n".join([f"- {t.amount} INR at {t.merchant_raw} ({t.category_id})" for t in txns])
        
        # 2. Get Budgets
        result = await self.db.execute(select(Budget).filter(Budget.user_id == user_id))
        budgets = result.scalars().all()
        budget_str = "\n".join([f"- Limit: {b.limit_amount} INR" for b in budgets])
        
        return f"Recent Transactions:\n{txn_str}\n\nBudgets:\n{budget_str}"

    async def process_message(self, user_id: uuid.UUID, message: str, session_id: str = None):
        # 1. Create/Get Session
        if not session_id:
            new_session = ChatSession(user_id=user_id, session_name=message[:20])
            self.db.add(new_session)
            await self.db.commit()
            session_id = new_session.id
        
        # 2. Get Context
        context = await self.get_financial_context(user_id)
        
        # 3. Prompt Engineering
        prompt = f"""
        You are a smart financial advisor. Use the user's data below to answer.
        User Data: {context}
        User Question: {message}
        Keep answer concise and actionable.
        """
        
        # 4. Generate Answer
        response = await model.generate_content_async(prompt)
        answer = response.text
        
        # 5. Save Interaction
        user_msg = ChatMessage(session_id=session_id, sender="user", content=message)
        ai_msg = ChatMessage(session_id=session_id, sender="ai", content=answer)
        self.db.add_all([user_msg, ai_msg])
        await self.db.commit()
        
        return answer, str(session_id)
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
from datetime import datetime
import logging
from app.services.ai.planning_engine import generate_plan
from app.services.plan_executer import apply_plan

from app.services.ai_guardrails import require_confirmation, AIAction, AIActionType
from app.services.chat_memory import embed_chat_message
from app.services.ai.action_detector import detect_action

from app.services.ai_confirmation_service import (
    create_pending_action,
    pop_pending_action,
)
from app.services.action_executor import ActionExecutor
from app.services.conflict_detector import (
    detect_budget_goal_conflicts,
    validate_budget_creation,
    validate_goal_allocation,
)
from app.services.ai_audit_logger import log_ai_action


client = genai.Client(api_key=settings.GEMINI_API_KEY)
logger = logging.getLogger(__name__)


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
            try:
                session_uuid = uuid.UUID(session_id)
            except ValueError:
                session_uuid = None

            if session_uuid:
                result = await self.db.execute(
                    select(ChatSession)
                    .where(ChatSession.id == session_uuid)
                    .where(ChatSession.user_id == user_id)
                )
                session = result.scalar_one_or_none()
                if session:
                    return session.id

        # CREATE NEW SESSION
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

    async def _validate_action_with_conflicts(self, user_id: uuid.UUID, action) -> tuple[bool, list[dict]]:
        """
        Validate action against conflicts before execution.
        Returns (is_valid, conflicts).
        """
        conflicts = []

        if action.action == "create_budget":
            if action.limit_amount:
                is_valid, budget_conflicts = await validate_budget_creation(
                    self.db, user_id, action.limit_amount
                )
                conflicts.extend(budget_conflicts)
                if not is_valid:
                    return False, conflicts

        elif action.action == "allocate_goal":
            if action.goal_id:
                is_valid, alloc_conflicts = await validate_goal_allocation(
                    self.db,
                    user_id,
                    action.goal_id,
                    income_source_id=action.income_source_id,
                    portfolio_holding_id=action.portfolio_holding_id,
                    allocation_percentage=action.allocation_percentage,
                    allocation_fixed_amount=action.allocation_fixed_amount,
                )
                conflicts.extend(alloc_conflicts)
                if not is_valid:
                    return False, conflicts

        return True, conflicts

    async def _execute_action(self, user_id: uuid.UUID, action, session_uuid: uuid.UUID) -> tuple[str, bool]:
        """
        Execute an AI action with proper validation and logging.
        Returns (response_message, success).
        """
        try:
            # Convert AIBudgetAction to AIAction for guardrails
            ai_action = AIAction(
                action=AIActionType(action.action),
                confidence=action.confidence,
                payload=action.model_dump(exclude_none=True),
            )
            REQUIRED_FIELDS = {
            "create_budget": ["name", "limit_amount"],
            "create_goal": ["name", "target_amount", "target_date"],
            "create_transaction": ["amount"],
        }
            missing = [
                f for f in REQUIRED_FIELDS.get(action.action, [])
                if getattr(action, f, None) is None
            ]

            if missing:
                return {
                    "message": f"❓ I need {', '.join(missing)} to {action.action.replace('_',' ')}.",
                    "action": action.action,
                    "data": None,
                }, False

            # Check guardrails
            if require_confirmation(ai_action):
                await create_pending_action(
                    db=self.db,
                    user_id=user_id,
                    action_type=action.action,
                    payload=action.model_dump(exclude_none=True),
                )
                await log_ai_action(
                    self.db,
                    user_id,
                    action.action,
                    "pending_confirmation",
                    action.model_dump(exclude_none=True),
                )
                return (
                    f"I can **{action.action.replace('_', ' ')}**, "
                    "but I need confirmation. Reply **confirm**.",
                    False
                )

            # Validate conflicts
            is_valid, conflicts = await self._validate_action_with_conflicts(user_id, action)
            if not is_valid:
                conflict_messages = [c.get("message", "") for c in conflicts]
                await log_ai_action(
                    self.db,
                    user_id,
                    action.action,
                    "blocked_conflict",
                    {"conflicts": conflicts},
                )
                return (
                    f"⚠️ Cannot {action.action.replace('_', ' ')}: "
                    f"{'; '.join(conflict_messages)}",
                    False
                )

            # Execute action via router
            executor = ActionExecutor(self.db)
            result = await executor.execute(user_id, action)

            # Log successful action
            await log_ai_action(
                self.db,
                user_id,
                action.action,
                "completed",
                {"result_id": str(getattr(result, "id", None))},
            )

            # Generate response message based on action type
            if action.action == "create_budget":
                answer = (
                    f"✅ Budget **{result.name}** created.\n"
                    f"Limit: ₹{result.limit_amount} ({result.period})"


                )

            elif action.action == "create_transaction":
                answer = (
                    f"✅ Transaction recorded: ₹{result.amount} "
                    f"at {result.merchant_raw or 'Unknown'}"
                )

            elif action.action == "create_goal":
                answer = (
                    f"✅ Goal **{result.name}** created.\n"
                    f"Target: ₹{result.target_amount} by {result.target_date}"
                )

            elif action.action == "allocate_goal":
                answer = "✅ Goal allocation completed."

            else:
                answer = f"✅ Action completed: {action.action.replace('_', ' ')}"

            return {
                    "message": answer,
                    "action": action.action,
                    "data": {
                        "id": str(getattr(result, "id", None)),
                        "type": action.action,
                    },
                }, True


        except Exception as e:
            logger.error(f"Error executing action {action.action}: {e}", exc_info=True)
            await log_ai_action(
                self.db,
                user_id,
                action.action,
                "failed",
                {"error": str(e)},
            )
            return {
                        "message": f"❌ Error: {str(e)}",
                        "action": action.action,
                        "data": None,
                    }, False


    async def process_message(
        self,
        user_id: uuid.UUID,
        message: str,
        session_id: Optional[str] = None,
        
    ) -> tuple[str, str]:
       
        
        # Handle confirmation
        if message.lower().strip() in {"confirm", "yes", "do it"}:
            pending = await pop_pending_action(self.db, user_id)
            if not pending:
                return ("Nothing to confirm.", session_id or "")

            # 🧠 PLAN CONFIRMATION
            if pending.action_type == "apply_plan":
                await apply_plan(
                    db=self.db,
                    user_id=user_id,
                    plan=pending.payload,
                )

                await log_ai_action(
                    self.db,
                    user_id,
                    "apply_plan",
                    "completed",
                    pending.payload,
                )

                return ("✅ Financial plan applied successfully.", session_id or "")

            # ⚙️ ACTION CONFIRMATION
            executor = ActionExecutor(self.db)
            from app.services.ai.actions import AIAction

            action = AIAction(**pending.payload)
            action.action = pending.action_type

            result = await executor.execute(user_id, action)

            await log_ai_action(
                self.db,
                user_id,
                pending.action_type,
                "confirmed_completed",
                {"result_id": str(getattr(result, "id", None))},
            )

            return (f"✅ Action completed: {pending.action_type}", session_id or "")


        session_uuid = await self._get_or_create_session(
            user_id=user_id,
            session_id=session_id,
            message=message,
        )

        # Get recent transactions for context
        txns = await self._get_recent_transactions(user_id)
        txn_context = "\n".join(
            f"₹{t.amount} at {t.merchant_raw}" for t in txns
        ) or "No recent transactions"
        PLANNING_KEYWORDS = {
            "start planning",
            "get advice",
            "help me plan",
            "what should i do",
            "suggest a plan",
            "financial plan",
            "make a plan",
        }

        def is_planning_mode(message: str) -> bool:
            text = message.lower()
            return any(k in text for k in PLANNING_KEYWORDS)
        # Detect action
        financial_context = await self.get_financial_context(user_id)

# 1️⃣ Planning / advice mode
     
        if is_planning_mode(message):
            plan = await generate_plan(
                message=message,
                financial_context=financial_context,
            )

            await create_pending_action(
                db=self.db,
                user_id=user_id,
                action_type="apply_plan",
                payload=plan,
            )

            return plan, str(session_uuid)


        # 2️⃣ Execution mode
        action = await detect_action(
            message=message,
            txn_context=txn_context,
            financial_context=financial_context,
        )


        # If action detected, execute it
        if action.action != "none":
            original_message = message
            result, success = await self._execute_action(
                                                            user_id, action, session_uuid
                                                        )
            message = result["message"]

            ai_msg = ChatMessage(
                session_id=session_uuid,
                sender="ai",
                content=message,
            )

            

            # Persist chat messages
            user_msg = ChatMessage(
                session_id=session_uuid,
                sender="user",
                content=original_message,
            )
           

            self.db.add_all([user_msg, ai_msg])
            await self.db.commit()

            await embed_chat_message(self.db, user_msg)
            await embed_chat_message(self.db, ai_msg)

            return result, str(session_uuid)

        # No action detected - normal chat response
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
            model="gemini-2.5-flash",
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

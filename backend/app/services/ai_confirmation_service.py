# app/services/ai_confirmation_service.py

from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import PendingAIAction

CONFIRM_TTL_MINUTES = 5

async def create_pending_action(
    db: AsyncSession,
    user_id,
    action_type: str,
    payload: dict,
):
    action = PendingAIAction(
        user_id=user_id,
        action_type=action_type,
        payload=payload,
        expires_at=datetime.utcnow() + timedelta(minutes=CONFIRM_TTL_MINUTES),
    )
    db.add(action)
    await db.commit()
    await db.refresh(action)
    return action


async def pop_pending_action(
    db: AsyncSession,
    user_id,
):
    result = await db.execute(
        select(PendingAIAction)
        .where(PendingAIAction.user_id == user_id)
        .where(PendingAIAction.expires_at > datetime.utcnow())
        .order_by(PendingAIAction.created_at.desc())
        .limit(1)
    )
    action = result.scalar_one_or_none()
    if not action:
        return None

    await db.delete(action)
    await db.commit()
    return action

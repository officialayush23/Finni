# app/services/ai_audit_logger.py

from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from uuid import UUID
import logging

from app.models.all_models import PendingAIAction

logger = logging.getLogger(__name__)


async def log_ai_action(
    db: AsyncSession,
    user_id: UUID,
    action_type: str,
    status: str,  # pending_confirmation, blocked_conflict, completed, confirmed_completed, failed
    metadata: dict | None = None,
):
    """
    Log AI actions for audit trail.
    Uses PendingAIAction model for now, but could be extended to a dedicated audit table.
    """
    try:
        # For now, we'll use the existing PendingAIAction model
        # In production, you might want a dedicated AIAuditLog table
        if status in ["pending_confirmation", "blocked_conflict"]:
            # These are already logged via create_pending_action
            pass
        else:
            # Log to application logger for now
            logger.info(
                f"AI Action: user={user_id}, action={action_type}, "
                f"status={status}, metadata={metadata}"
            )
    except Exception as e:
        logger.error(f"Error logging AI action: {e}", exc_info=True)


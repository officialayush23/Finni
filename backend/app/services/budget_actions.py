# backend/app/services/budget_actions.py
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import Budget
from app.services.conflict_detector import validate_budget_creation, create_conflict_record
from datetime import date
import logging

logger = logging.getLogger(__name__)


async def create_budget_from_ai(
    db: AsyncSession,
    user_id,
    name: str,
    limit_amount: float,
    period: str,
):
    """
    Create a budget from AI with conflict detection.
    """
    # Validate for conflicts
    is_valid, conflicts = await validate_budget_creation(db, user_id, limit_amount)
    
    if not is_valid:
        # Log conflicts but don't block creation (could be made stricter)
        for conflict in conflicts:
            await create_conflict_record(
                db,
                user_id,
                conflict["type"],
                conflict["details"],
                month=date.today().replace(day=1),
            )
        logger.warning(
            f"Budget creation for user {user_id} has conflicts: {conflicts}"
        )

    budget = Budget(
        user_id=user_id,
        name=name,
        limit_amount=limit_amount,
        period=period,
        alert_threshold=80,
        metadata_={},
    )

    db.add(budget)
    await db.commit()
    await db.refresh(budget)

    return budget

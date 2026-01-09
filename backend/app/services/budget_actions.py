# backend/app/services/budget_actions.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import Budget
from app.services.conflict_detector import validate_budget_creation, create_conflict_record
from datetime import date
import logging

logger = logging.getLogger(__name__)


async def create_budget_from_ai(
    db: AsyncSession,
    *,
    user_id,
    name: str,
    limit_amount: float,
    period: str,
    metadata: dict | None = None,
):
    """
    STRICT AI budget creation.
    - Conflicts are RECORDED
    - Creation is BLOCKED on hard conflicts
    """

    if not name or not limit_amount or limit_amount <= 0:
        raise ValueError("Budget name and positive limit_amount are required")

    # 🔒 Conflict validation
    is_valid, conflicts = await validate_budget_creation(db, user_id, limit_amount)

    if not is_valid:
        for conflict in conflicts:
            await create_conflict_record(
                db=db,
                user_id=user_id,
                conflict_type=conflict["type"],
                details=conflict["details"],
                month=date.today().replace(day=1),
            )

        # 🚫 HARD STOP — no ghost budgets
        raise ValueError(
            "Budget conflicts detected: "
            + "; ".join(c.get("message", "") for c in conflicts)
        )

    # 🔁 Prevent duplicate budget names
    existing = await db.execute(
        select(Budget)
        .where(Budget.user_id == user_id)
        .where(Budget.name.ilike(name))
    )
    if existing.scalar_one_or_none():
        raise ValueError(f"Budget '{name}' already exists")

    budget = Budget(
        user_id=user_id,
        name=name,
        limit_amount=limit_amount,
        period=period,
        alert_threshold=80,
        metadata_=metadata or {},
    )

    db.add(budget)
    await db.commit()
    await db.refresh(budget)

    logger.info(f"[AI_BUDGET_CREATED] user={user_id} budget={budget.id}")

    return budget
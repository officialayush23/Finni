from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import Budget


async def create_budget_from_ai(
    db: AsyncSession,
    user_id,
    name: str,
    limit_amount: float,
    period: str,
):
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

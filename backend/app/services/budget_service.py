# app/services/budget_service.py

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import Category, Transaction
from datetime import datetime, date

async def get_category_tree_ids(
    db: AsyncSession,
    root_category_id
) -> list:
    """
    Returns all category IDs under a root (including itself)
    """
    cte = (
        select(Category.id)
        .where(Category.id == root_category_id)
        .cte(recursive=True)
    )

    cte = cte.union_all(
        select(Category.id).where(Category.parent_id == cte.c.id)
    )

    result = await db.execute(select(cte.c.id))
    return [row[0] for row in result.all()]


async def calculate_budget_usage(
    db: AsyncSession,
    user_id,
    category_id,
    start_date: date,
    end_date: date,
) -> float:
    category_ids = await get_category_tree_ids(db, category_id)

    result = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0))
        .where(
            Transaction.user_id == user_id,
            Transaction.category_id.in_(category_ids),
            Transaction.occurred_at >= start_date,
            Transaction.occurred_at <= end_date,
        )
    )

    return float(result.scalar())

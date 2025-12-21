# app/services/budget_engine.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date, timedelta
from app.models.all_models import Transaction, Category


def get_period_window(period: str):
    today = date.today()
    if period == "daily":
        return today, today
    if period == "weekly":
        return today - timedelta(days=today.weekday()), today
    return today.replace(day=1), today


async def resolve_category_tree(db: AsyncSession, root_ids: list[str]) -> list[str]:
    ids = set(root_ids)

    for root_id in root_ids:
        result = await db.execute(
            select(Category.id).where(Category.parent_id == root_id)
        )
        ids.update([str(r[0]) for r in result.all()])

    return list(ids)


async def calculate_budget_spent(
    db: AsyncSession,
    user_id,
    budget,
) -> float:
    meta = budget.metadata or {}
    included = meta.get("included_category_ids", [])
    excluded = meta.get("excluded_category_ids", [])
    excluded_merchants = meta.get("excluded_merchants", [])

    included_ids = await resolve_category_tree(db, included)

    start, end = get_period_window(budget.period)

    stmt = (
        select(func.coalesce(func.sum(Transaction.amount), 0))
        .where(
            Transaction.user_id == user_id,
            Transaction.category_id.in_(included_ids),
            Transaction.occurred_at >= start,
            Transaction.occurred_at <= end,
        )
    )

    if excluded:
        stmt = stmt.where(~Transaction.category_id.in_(excluded))

    if excluded_merchants:
        stmt = stmt.where(~Transaction.merchant_raw.in_(excluded_merchants))

    result = await db.execute(stmt)
    return float(result.scalar())

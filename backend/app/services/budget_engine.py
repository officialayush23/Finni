from sqlalchemy import select, func
from datetime import date
from uuid import UUID
from app.models.all_models import Transaction


def _safe_uuid_list(values):
    safe = []
    for v in values or []:
        try:
            safe.append(UUID(v))
        except Exception:
            continue
    return safe


async def calculate_budget_spent(db, user_id, budget):
    meta = budget.metadata_ or {}

    include_ids = _safe_uuid_list(meta.get("included_category_ids"))
    exclude_ids = _safe_uuid_list(meta.get("excluded_category_ids"))
    exclude_merchants = meta.get("excluded_merchants", [])

    stmt = (
        select(func.coalesce(func.sum(Transaction.amount), 0))
        .where(Transaction.user_id == user_id)
    )

    if include_ids:
        stmt = stmt.where(Transaction.category_id.in_(include_ids))
    if exclude_ids:
        stmt = stmt.where(~Transaction.category_id.in_(exclude_ids))
    if exclude_merchants:
        stmt = stmt.where(~Transaction.merchant_raw.in_(exclude_merchants))

    start = date.today().replace(day=1)
    stmt = stmt.where(Transaction.occurred_at >= start)

    result = await db.execute(stmt)
    return float(result.scalar())

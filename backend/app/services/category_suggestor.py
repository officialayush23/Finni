# app/services/category_suggestor.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from uuid import UUID
from app.models.all_models import (
    Transaction,
    MerchantCategoryMap,
    Category,
)

async def suggest_categories(
    db: AsyncSession,
    *,
    user_id: UUID,
    merchant_id: UUID | None,
    limit: int = 3,
):
    suggestions: dict[UUID, float] = {}

    # 1️⃣ Merchant-specific history (highest weight)
    if merchant_id:
        result = await db.execute(
            select(
                MerchantCategoryMap.category_id,
                func.avg(MerchantCategoryMap.confidence).label("score"),
            )
            .where(MerchantCategoryMap.user_id == user_id)
            .where(MerchantCategoryMap.merchant_id == merchant_id)
            .group_by(MerchantCategoryMap.category_id)
        )
        for cat_id, score in result:
            suggestions[cat_id] = suggestions.get(cat_id, 0) + float(score) * 0.6

    # 2️⃣ User spending history
    result = await db.execute(
        select(
            Transaction.category_id,
            func.count(Transaction.id).label("cnt"),
        )
        .where(Transaction.user_id == user_id)
        .where(Transaction.category_id.isnot(None))
        .group_by(Transaction.category_id)
    )

    max_cnt = max([r.cnt for r in result] or [1])
    for cat_id, cnt in result:
        suggestions[cat_id] = suggestions.get(cat_id, 0) + (cnt / max_cnt) * 0.3

    # 3️⃣ System categories fallback
    result = await db.execute(
        select(Category.id)
        .where(Category.user_id.is_(None))
        .limit(5)
    )
    for (cat_id,) in result:
        suggestions.setdefault(cat_id, 0.1)

    # Rank
    ranked = sorted(
        suggestions.items(),
        key=lambda x: x[1],
        reverse=True,
    )[:limit]

    return [
        {
            "category_id": str(cat_id),
            "confidence": round(score, 2),
        }
        for cat_id, score in ranked
    ]

# app/services/transaction_ingestion.py
# app/services/transaction_ingestion.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import (
    MerchantMaster,
    MerchantCategoryMap,
    Category,
)
from app.services.ai.categorizer import categorize_transaction


async def resolve_merchant_and_category(
    db: AsyncSession,
    *,
    user_id,
    merchant_raw: str,
):
    # Simple deterministic normalization (DB will normalize further)
    norm = merchant_raw.lower().strip()

    # 1️⃣ Find or create merchant
    result = await db.execute(
        select(MerchantMaster)
        .where(MerchantMaster.canonical_name_norm == norm)
    )
    merchant = result.scalar_one_or_none()

    if not merchant:
        merchant = MerchantMaster(
            canonical_name=merchant_raw,
            canonical_name_norm=norm,
        )
        db.add(merchant)
        await db.flush()

    # 2️⃣ User override mapping
    result = await db.execute(
        select(MerchantCategoryMap)
        .where(MerchantCategoryMap.user_id == user_id)
        .where(MerchantCategoryMap.merchant_id == merchant.id)
    )
    mapping = result.scalar_one_or_none()
    if mapping:
        return merchant, mapping.category_id

    # 3️⃣ AI categorization (fallback)
    ai = await categorize_transaction(merchant_raw)

    cat_result = await db.execute(
        select(Category)
        .where(Category.user_id.is_(None))
        .where(Category.name.ilike(ai["category_name"]))
    )
    category = cat_result.scalar_one_or_none()

    if category:
        db.add(
            MerchantCategoryMap(
                user_id=user_id,
                merchant_id=merchant.id,
                category_id=category.id,
                confidence=ai["confidence"],
                source="ai",
            )
        )

    return merchant, category.id if category else None

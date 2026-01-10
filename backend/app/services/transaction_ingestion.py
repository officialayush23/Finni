# app/services/transaction_ingestion.py
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
    norm = merchant_raw.lower().strip()

    # 1️⃣ Merchant (always)
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

    # 2️⃣ User override (strongest signal)
    result = await db.execute(
        select(MerchantCategoryMap)
        .where(MerchantCategoryMap.user_id == user_id)
        .where(MerchantCategoryMap.merchant_id == merchant.id)
        .order_by(MerchantCategoryMap.confidence.desc())
    )
    mapping = result.scalar_one_or_none()
    if mapping:
        return merchant, mapping.category_id, float(mapping.confidence)

    # 3️⃣ AI fallback (SOFT dependency)
    try:
        ai = await categorize_transaction(merchant_raw)
        confidence = ai["confidence"]

        result = await db.execute(
            select(Category)
            .where(Category.user_id.is_(None))
            .where(Category.name.ilike(ai["category_name"]))
        )
        category = result.scalar_one_or_none()

        if category:
            db.add(
                MerchantCategoryMap(
                    user_id=user_id,
                    merchant_id=merchant.id,
                    category_id=category.id,
                    confidence=confidence,
                    source="ai",
                )
            )

        return merchant, (category.id if category else None), confidence

    except Exception as e:
        # 🔥 HARD FALLBACK
        # AI failed → do NOT block transaction
        return merchant, None, 0.0

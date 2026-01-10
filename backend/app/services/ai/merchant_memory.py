# app/services/ai/merchant_memory.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import MerchantCategoryMap

async def get_known_category(
    db: AsyncSession,
    user_id,
    merchant_id,
):
    result = await db.execute(
        select(MerchantCategoryMap)
        .where(MerchantCategoryMap.user_id == user_id)
        .where(MerchantCategoryMap.merchant_id == merchant_id)
        .where(MerchantCategoryMap.source == "user")
    )
    return result.scalar_one_or_none()

# app/services/ai/merchant_memory.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import MerchantCategoryMap

async def get_known_category(
    db: AsyncSession,
    user_id,
    normalized_merchant: str
):
    result = await db.execute(
        select(MerchantCategoryMap)
        .where(MerchantCategoryMap.user_id == user_id)
        .where(MerchantCategoryMap.source == "user")
    )
    return result.scalars().first()

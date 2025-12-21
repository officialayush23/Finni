# app/api/v1/endpoints/user.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import User
from app.schemas.schemas import UserProfileCreate, UserProfileResponse

router = APIRouter()

@router.post("/profile", response_model=UserProfileResponse)
async def upsert_profile(
    payload: UserProfileCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(select(User).where(User.id == auth.user_id))
    user = result.scalar_one_or_none()

    if not user:
        user = User(
            id=auth.user_id,
            email=auth.email,
            full_name=payload.full_name,
            phone=payload.phone,
            preferences=payload.preferences or {},
            metadata_=payload.metadata or {},
        )
        db.add(user)
    else:
        user.full_name = payload.full_name
        user.phone = payload.phone
        user.preferences = payload.preferences or {}
        user.metadata_ = payload.metadata or {}

    await db.commit()
    await db.refresh(user)

    return UserProfileResponse(
        id=str(user.id),
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        preferences=user.preferences,
        metadata=user.metadata_,
    )

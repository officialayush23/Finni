# app/api/v1/endpoints/user.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import User
from app.schemas.schemas import UserProfileCreate, UserProfileResponse, UserProfileUpdate
from app.schemas.schemas import UserOnboardingRequest, IncomeRead, InvestmentRead
from app.models.all_models import IncomeSource, PortfolioHolding
from app.services.onboarding_service import OnboardingService
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





@router.post("/onboarding")
async def onboarding(
    payload: UserOnboardingRequest,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    service = OnboardingService(db)
    await service.run(
        user_id=auth.user_id,
        email=auth.email,
        payload=payload,
    )
    return {"status": "onboarding_complete"}


@router.get("/profile", response_model=UserProfileResponse)
async def get_profile(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    user = await db.get(User, auth.user_id)

    incomes = (
        await db.execute(
            select(IncomeSource).where(IncomeSource.user_id == auth.user_id)
        )
    ).scalars().all()

    investments = (
        await db.execute(
            select(PortfolioHolding).where(PortfolioHolding.user_id == auth.user_id)
        )
    ).scalars().all()

    return UserProfileResponse(
        id=str(user.id),
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        preferences=user.preferences or {},
        incomes=[
            IncomeRead(
                id=str(i.id),
                name=i.name,
                estimated_monthly_amount=i.estimated_monthly_amount,
                rate_type=i.rate_type,
                ai_source_identifier=i.api_source_identifier,
            )
            for i in incomes
        ],
        investments=[
            InvestmentRead(
                id=str(inv.id),
                asset_type=inv.asset_type,
                identifier=inv.identifier,
                name=inv.name,
                current_value=inv.current_value,
                expected_return_pct=(
                    inv.metadata_.get("expected_return_pct")
                    if inv.metadata_ else None
                ),
                pinned=(
                    inv.metadata_.get("pinned", False)
                    if inv.metadata_ else False
                ),
                last_api_fetch=(
                    inv.last_api_fetch.isoformat()
                    if inv.last_api_fetch else None
                ),
            )
            for inv in investments
        ],
    )


@router.patch("/profile")
async def update_profile(
    payload: UserProfileUpdate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    user = await db.get(User, auth.user_id)

    if payload.full_name is not None:
        user.full_name = payload.full_name
    if payload.phone is not None:
        user.phone = payload.phone
    if payload.preferences is not None:
        user.preferences = payload.preferences

    await db.commit()
    return {"status": "updated"}

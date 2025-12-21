# app/api/v1/endpoints/investments.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import PortfolioHolding
from app.schemas.schemas import InvestmentCreate, InvestmentResponse, InvestmentUpdate
from app.services.price_engine import fetch_stock_price
from datetime import datetime
from sqlalchemy import select
router = APIRouter()

@router.post("/", response_model=InvestmentResponse)
async def create_investment(
    payload: InvestmentCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    holding = PortfolioHolding(
        user_id=auth.user_id,
        asset_type=payload.asset_type,
        identifier=payload.identifier,
        name=payload.name,
        quantity=payload.quantity,
        avg_buy_price=payload.avg_buy_price,
        metadata={
            "expected_annual_return": payload.expected_annual_return,
            "risk_level": payload.risk_level,
            "is_pinned": payload.is_pinned,
        },
    )

    db.add(holding)
    await db.commit()
    await db.refresh(holding)

    return InvestmentResponse(
        id=str(holding.id),
        asset_type=holding.asset_type,
        identifier=holding.identifier,
        name=holding.name,
        quantity=holding.quantity,
        avg_buy_price=holding.avg_buy_price,
        current_value=holding.current_value,
        last_api_fetch=holding.last_api_fetch,
        expected_annual_return=payload.expected_annual_return,
        risk_level=payload.risk_level,
        is_pinned=payload.is_pinned,
    )




@router.get("/", response_model=list[InvestmentResponse])
async def list_investments(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(PortfolioHolding)
        .where(PortfolioHolding.user_id == auth.user_id)
        .order_by(PortfolioHolding.updated_at.desc())
    )

    holdings = result.scalars().all()
    response = []

    for h in holdings:
        meta = h.metadata_ or {}
        response.append(
            InvestmentResponse(
                id=str(h.id),
                asset_type=h.asset_type,
                identifier=h.identifier,
                name=h.name,
                quantity=h.quantity,
                avg_buy_price=h.avg_buy_price,
                current_value=h.current_value,
                last_api_fetch=h.last_api_fetch,
                expected_annual_return=meta.get("expected_annual_return"),
                risk_level=meta.get("risk_level"),
                is_pinned=meta.get("is_pinned", False),
            )
        )

    return response


@router.patch("/{investment_id}")
async def update_investment(
    investment_id: str,
    payload: InvestmentUpdate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    holding = await db.get(PortfolioHolding, investment_id)

    if not holding or holding.user_id != auth.user_id:
        raise HTTPException(status_code=404, detail="Investment not found")

    meta = holding.metadata_ or {}

    for field, value in payload.model_dump(exclude_unset=True).items():
        if field in ["expected_annual_return", "risk_level", "is_pinned"]:
            meta[field] = value
        else:
            setattr(holding, field, value)

    holding.metadata_ = meta
    await db.commit()

    return {"status": "updated"}

@router.post("/{investment_id}/refresh")
async def refresh_investment(
    investment_id: str,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    holding = await db.get(PortfolioHolding, investment_id)

    if not holding or holding.user_id != auth.user_id:
        raise HTTPException(status_code=404)

    from app.services.investment_engine import InvestmentEngine

    await InvestmentEngine.refresh_holding(holding)
    await db.commit()

    return {"status": "refreshed", "current_value": holding.current_value}
 


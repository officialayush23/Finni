# app/api/v1/endpoints/investments.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import PortfolioHolding
from app.schemas.schemas import InvestmentCreate, InvestmentResponse
from app.services.price_engine import fetch_stock_price
from datetime import datetime
from sqlalchemy import select
router = APIRouter()

@router.post("/", response_model=InvestmentResponse)
async def add_investment(
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
    )
    db.add(holding)
    await db.commit()
    await db.refresh(holding)

    return InvestmentResponse(
        id=str(holding.id),
        current_value=holding.current_value,
        **payload.model_dump(),
    )




@router.get("/", response_model=list[InvestmentResponse])
async def list_investments(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(PortfolioHolding).where(PortfolioHolding.user_id == auth.user_id)
    )
    holdings = result.scalars().all()

    response = []
    for h in holdings:
        if h.asset_type == "stock":
            price = await fetch_stock_price(h.identifier)
            h.current_value = price * h.quantity
            h.last_api_fetch = datetime.utcnow()

        response.append(
            InvestmentResponse(
                id=str(h.id),
                asset_type=h.asset_type,
                identifier=h.identifier,
                name=h.name,
                quantity=h.quantity,
                avg_buy_price=h.avg_buy_price,
                current_value=h.current_value,
            )
        )

    await db.commit()
    return response
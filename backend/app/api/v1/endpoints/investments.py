# app/api/v1/endpoints/investments.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import PortfolioHolding
from app.schemas.schemas import InvestmentCreate, InvestmentResponse

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

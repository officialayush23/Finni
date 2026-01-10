# app/api/v1/endpoints/transactions.py
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date
from uuid import UUID

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import Transaction, MerchantCategoryMap
from app.schemas.schemas import (
    TransactionCreate,
    TransactionUpdate,
    TransactionResponse,
)
from app.services.transaction_service import create_transaction as create_txn_service
from app.utils.api_errors import api_error
from app.models.all_models import TxnSourceEnum


router = APIRouter()


@router.post("/", response_model=TransactionResponse)
async def create_transaction(
    payload: TransactionCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    txn = await create_txn_service(
        db=db,
        user_id=auth.user_id,
        amount=payload.amount,
        occurred_at=payload.occurred_at,
        source=payload.source,
        merchant_raw=payload.merchant_raw,
        description=payload.description,
        category_id=payload.category_id,
    )
    return txn


@router.get("/", response_model=list[TransactionResponse])
async def list_transactions(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    stmt = select(Transaction).where(Transaction.user_id == auth.user_id)

    if start_date:
        stmt = stmt.where(Transaction.occurred_at >= start_date)
    if end_date:
        stmt = stmt.where(Transaction.occurred_at <= end_date)

    result = await db.execute(stmt.order_by(Transaction.occurred_at.desc()))
    txns = result.scalars().all()
    return [TransactionResponse.from_orm(txn) for txn in txns]



@router.patch("/{txn_id}", response_model=TransactionResponse)
async def update_transaction(
    txn_id: str,
    payload: TransactionUpdate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(Transaction).where(
            Transaction.id == txn_id,
            Transaction.user_id == auth.user_id,
        )
    )
    txn = result.scalar_one_or_none()

    if not txn:
        raise api_error("TXN_NOT_FOUND", "Transaction not found", 404)

    for field, value in payload.model_dump(exclude_unset=True).items():
        if field == "source":
            value = TxnSourceEnum(value)
        setattr(txn, field, value)

    await db.commit()
    await db.refresh(txn)

    return TransactionResponse.from_orm(txn)

@router.get("/review", response_model=list[TransactionResponse])
async def transactions_needing_review(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(Transaction)
        .where(Transaction.user_id == auth.user_id)
        .where(Transaction.needs_category_review == True)
    )
    return result.scalars().all()
@router.patch("/{txn_id}/category")

async def confirm_transaction_category(
    txn_id: UUID,
    category_id: UUID,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    txn = await db.get(Transaction, txn_id)
    if not txn or txn.user_id != auth.user_id:
        raise HTTPException(404)

    txn.category_id = category_id
    txn.category_confidence = 1.0
    txn.needs_category_review = False

    if txn.merchant_id:
        db.add(
            MerchantCategoryMap(
                user_id=auth.user_id,
                merchant_id=txn.merchant_id,
                category_id=category_id,
                confidence=1.0,
                source="user",
            )
        )

    await db.commit()
    return {"status": "confirmed"}

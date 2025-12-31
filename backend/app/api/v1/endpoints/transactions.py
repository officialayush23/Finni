# app/api/v1/endpoints/transactions.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import Transaction, TxnSourceEnum
from app.schemas.schemas import (
    TransactionCreate,
    TransactionUpdate,
    TransactionResponse,
)
from app.services.transaction_service import handle_budget_checks
from app.utils.api_errors import api_error

router = APIRouter()


@router.post("/", response_model=TransactionResponse)
async def create_transaction(
    payload: TransactionCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    try:
        txn = Transaction(
            user_id=auth.user_id,
            amount=payload.amount,
            currency=payload.currency,
            occurred_at=payload.occurred_at,
            category_id=payload.category_id,
            merchant_raw=payload.merchant_raw,
            description=payload.description,
            source=TxnSourceEnum(payload.source),
        )

        db.add(txn)
        await db.commit()
        await db.refresh(txn)

        await handle_budget_checks(db, txn)

        return TransactionResponse.from_orm(txn)

    except Exception as e:
        raise api_error("TXN_CREATE_FAILED", str(e))


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
    return result.scalars().all()


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

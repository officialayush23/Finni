# app/api/v1/endpoints/transactions.py
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import Transaction
from app.schemas.schemas import TransactionCreate, TransactionResponse
from app.services.transaction_service import handle_budget_checks

router = APIRouter()


@router.post("/", response_model=TransactionResponse)
async def create_transaction(
    payload: TransactionCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    txn = Transaction(
        user_id=auth.user_id,
        amount=payload.amount,
        currency=payload.currency,
        occurred_at=payload.occurred_at,
        category_id=payload.category_id,
        merchant_raw=payload.merchant_raw,
        description=payload.description,
        source=TxnSourceEnum(payload.source),  # ✅ FIX
    )

    db.add(txn)
    await db.commit()
    await db.refresh(txn)

    await handle_budget_checks(db, txn)

    return TransactionResponse(
        id=str(txn.id),
        amount=txn.amount,
        currency=txn.currency,
        occurred_at=txn.occurred_at,
        category_id=str(txn.category_id),
        merchant_raw=txn.merchant_raw,
        description=txn.description,
        source=txn.source.value,
    )

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

    return [
        TransactionResponse(
            id=str(t.id),
            amount=t.amount,
            currency=t.currency,
            occurred_at=t.occurred_at,
            category_id=str(t.category_id),
            merchant_raw=t.merchant_raw,
            description=t.description,
            source=t.source,
        )
        for t in txns
    ]


@router.patch("/{txn_id}", response_model=TransactionResponse)
async def update_transaction(
    txn_id: str,
    payload: TransactionCreate,
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
        raise HTTPException(status_code=404, detail="Transaction not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(txn, field, value)

    await db.commit()
    await db.refresh(txn)

    return TransactionResponse(
        id=str(txn.id),
        amount=txn.amount,
        currency=txn.currency,
        occurred_at=txn.occurred_at,
        category_id=str(txn.category_id),
        merchant_raw=txn.merchant_raw,
        description=txn.description,
        source=txn.source,
    )
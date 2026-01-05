# app/services/transaction_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime
from uuid import UUID

from app.models.all_models import Transaction, Budget, Category, TxnSourceEnum
from app.services.budget_engine import calculate_budget_spent
from app.services.budget_alerts import send_budget_alert


# -----------------------------
# MAIN ENTRY POINT (AI / VOICE / CHAT)
# -----------------------------
async def create_transaction_from_ai(
    db: AsyncSession,
    user_id: UUID,
    amount: float,
    occurred_at: datetime | None = None,
    category_id: UUID | None = None,
    merchant_raw: str | None = None,
    description: str | None = None,
    source: str = "chatbot",
):
    if amount <= 0:
        raise ValueError("Transaction amount must be positive")

    txn = Transaction(
        user_id=user_id,
        amount=amount,
        occurred_at=occurred_at or datetime.utcnow(),
        category_id=category_id,
        merchant_raw=merchant_raw,
        description=description,
        source=TxnSourceEnum(source),
    )

    db.add(txn)
    await db.commit()
    await db.refresh(txn)

    # 🔑 CRITICAL: budget deduction & alerts
    await handle_budget_checks(db, txn)

    return txn


# -----------------------------
# BUDGET HANDLING (YOUR ORIGINAL, KEPT)
# -----------------------------
async def handle_budget_checks(
    db: AsyncSession,
    transaction: Transaction,
):
    result = await db.execute(
        select(Budget)
        .where(Budget.user_id == transaction.user_id)
        .where(Budget.is_active == True)
    )

    budgets = result.scalars().all()

    for budget in budgets:
        spent = await calculate_budget_spent(
            db=db,
            user_id=transaction.user_id,
            budget=budget,
        )

        pct = (
            (spent / float(budget.limit_amount)) * 100
            if budget.limit_amount
            else 0
        )

        if pct >= float(budget.alert_threshold):
            await send_budget_alert(
                user_id=transaction.user_id,
                category_name=budget.name,
                spent=spent,
                limit=float(budget.limit_amount),
                percentage=pct,
            )


# app/services/transaction_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import Budget

async def handle_budget_checks(
    db: AsyncSession,
    txn,
):
    budgets = (
        await db.execute(
            select(Budget)
            .where(Budget.user_id == txn.user_id)
            .where(Budget.is_active == True)
        )
    ).scalars().all()

    for budget in budgets:
        meta = budget.metadata_ or {}
        categories = meta.get("category_ids", [])

        if txn.category_id and str(txn.category_id) in categories:
            meta["used_amount"] = float(meta.get("used_amount", 0)) + float(txn.amount)
            budget.metadata_ = meta

            # optional alert trigger
            usage_pct = (meta["used_amount"] / float(budget.limit_amount)) * 100
            if usage_pct >= budget.alert_threshold:
                # enqueue notification / websocket
                pass

    await db.commit()

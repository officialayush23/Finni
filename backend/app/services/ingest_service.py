# app/services/ingest_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.models.all_models import RawFinancialEvent, Transaction, TxnSourceEnum
from app.services.transaction_ai import explain_transaction
from app.services.transaction_service import handle_budget_checks
from app.services.websocket_manager import manager
from app.services.parsers.simple_parser import parse_transaction_text


# ---- helper: normalize external sources ----
def normalize_txn_source(raw_source: str) -> TxnSourceEnum:
    """
    Map arbitrary sources to txn_source_enum safely.
    """
    try:
        return TxnSourceEnum(raw_source)
    except ValueError:
        return TxnSourceEnum.notification


async def process_raw_event(
    db: AsyncSession,
    raw: RawFinancialEvent,
):
    # 1️⃣ Parse
    parsed = await parse_transaction_text(raw.raw_text)
    if not parsed:
        return  # silently ignore non-financial text

    # 2️⃣ Normalize source safely
    txn_source = normalize_txn_source(raw.source)

    # 3️⃣ Create transaction (linked to raw event)
    txn = Transaction(
        user_id=raw.user_id,
        amount=parsed["amount"],
        currency=parsed.get("currency", "INR"),
        occurred_at=parsed.get("occurred_at", datetime.utcnow()),
        merchant_raw=parsed.get("merchant"),
        category_id=parsed.get("category_id"),
        description=parsed.get("description"),
        source=txn_source,
        raw_event_id=raw.id,   # ✅ CRITICAL
    )

    db.add(txn)
    await db.flush()  # ensures txn.id exists without committing yet

    # 4️⃣ Mark raw event parsed
    raw.parsed = True

    await db.commit()
    await db.refresh(txn)

    # 5️⃣ Budget checks + AI (non-blocking critical path)
    await handle_budget_checks(db, txn)
    await explain_transaction(db, txn)

    # 6️⃣ WebSocket notify
    await manager.broadcast_to_user(
        str(raw.user_id),
        {
            "type": "transaction_created",
            "data": {
                "id": str(txn.id),
                "amount": float(txn.amount),
                "merchant": txn.merchant_raw,
                "category_id": str(txn.category_id) if txn.category_id else None,
                "source": txn.source.value,
            },
        },
    )

# app/services/ingest_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.models.all_models import RawFinancialEvent, Transaction, TxnSourceEnum
from app.services.transaction_ai import explain_transaction
from app.services.transaction_service import handle_budget_checks
from app.services.websocket_manager import manager
from app.services.parsers.simple_parser import parse_transaction_text


async def process_raw_event(
    db: AsyncSession,
    raw: RawFinancialEvent,
):
    parsed = await parse_transaction_text(raw.raw_text)
    if not parsed:
        return

    # 🔥 CRITICAL FIX: normalize enum
    txn = Transaction(
        user_id=raw.user_id,
        amount=parsed["amount"],
        currency=parsed.get("currency", "INR"),
        occurred_at=parsed.get("occurred_at", datetime.utcnow()),
        merchant_raw=parsed.get("merchant"),
        category_id=parsed.get("category_id"),
        description=parsed.get("description"),
        source=TxnSourceEnum(raw.source),  # ✅ ENUM, not string
    )

    db.add(txn)
    await db.commit()
    await db.refresh(txn)

    raw.is_parsed = True
    raw.parsed_transaction_id = txn.id
    await db.commit()

    await handle_budget_checks(db, txn)
    await explain_transaction(db, txn)

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

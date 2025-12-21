# app/services/ingest_service.py

import re
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.models.all_models import RawFinancialEvent, Transaction
from app.services.transaction_service import handle_budget_checks
from app.services.websocket_manager import manager

AMOUNT_REGEX = r"(₹|Rs\.?)\s?([\d,]+\.?\d*)"

async def process_raw_event(
    db: AsyncSession,
    raw: RawFinancialEvent,
):
    """
    Parse raw text → create transaction
    """
    text = raw.raw_text

    match = re.search(AMOUNT_REGEX, text)
    if not match:
        return

    amount = float(match.group(2).replace(",", ""))

    txn = Transaction(
        user_id=raw.user_id,
        amount=amount,
        currency="INR",
        occurred_at=datetime.utcnow(),
        merchant_raw=raw.sender,
        description=text,
        source=raw.source,
        raw_event_id=raw.id,
    )

    db.add(txn)
    raw.is_parsed = True
    raw.parsed_transaction_id = txn.id

    await db.commit()
    await db.refresh(txn)

    # budget + realtime
    await handle_budget_checks(db, txn)

    await manager.broadcast_to_user(
        str(raw.user_id),
        {
            "type": "transaction_created",
            "data": {
                "amount": amount,
                "source": raw.source,
                "merchant": raw.sender,
            },
        },
    )

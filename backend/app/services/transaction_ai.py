# app/services/transaction_ai.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import Transaction, AIExplanation
from app.services.ai_service import generate_text


async def explain_transaction(
    db: AsyncSession,
    txn: Transaction,
):
    prompt = f"""
Explain this financial transaction in simple terms.
Detect anomalies if any.

Amount: {txn.amount}
Merchant: {txn.merchant_raw}
Category ID: {txn.category_id}
Source: {txn.source.value}
"""

    explanation = await generate_text(prompt)

    ai = AIExplanation(
        entity_type="transaction",
        entity_id=txn.id,
        explanation={"summary": explanation},
        model="gemini",
    )

    db.add(ai)
    await db.commit()

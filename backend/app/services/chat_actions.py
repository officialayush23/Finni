# app/services/chat_actions.py

# app/services/chat_actions.py

import re
from decimal import Decimal
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import Budget

BUDGET_PATTERN = re.compile(
    r"(create|set|add).*(budget).*?(₹|rs\.?)?\s?(\d+)",
    re.IGNORECASE,
)

CATEGORY_HINTS = {
    "food": "Food",
    "groceries": "Groceries",
    "rent": "Rent",
    "shopping": "Shopping",
    "travel": "Travel",
}


async def maybe_create_budget(
    db: AsyncSession,
    user_id,
    ai_text: str,
):
    """
    Very conservative:
    - Only creates if user explicitly says create/set/add budget
    - Extracts amount safely
    """

    match = BUDGET_PATTERN.search(ai_text)
    if not match:
        return None

    amount = Decimal(match.group(4))

    name = "General"
    for key, label in CATEGORY_HINTS.items():
        if key in ai_text.lower():
            name = label
            break

    budget = Budget(
        user_id=user_id,
        name=f"{name} Budget",
        limit_amount=amount,
        period="monthly",
    )

    db.add(budget)
    await db.commit()
    await db.refresh(budget)

    return budget

# app/services/ai/prompts.py
CATEGORIZATION_PROMPT = """
You are a financial transaction classifier.

Return ONLY valid JSON.
No markdown. No explanation outside JSON.

Input:
{text}

Rules:
- Pick the best category_id from the provided list
- If unsure, lower confidence
- Normalize merchant name
- Detect food, subscription, recurring signals
"""


BUDGET_ACTION_PROMPT = """
You are a financial assistant.

Detect what action the user wants to perform from their message.

Return ONLY valid JSON. No markdown.

Possible actions:
- "create_budget" - User wants to create/set a budget
- "create_transaction" - User wants to record a transaction/expense
- "create_goal" - User wants to create a financial goal
- "allocate_goal" - User wants to allocate income/investment to a goal
- "none" - No action detected, just a question

Fields (only include relevant ones):
- action: one of the above
- confidence: 0.0 to 1.0 (how confident you are)
- name: budget or goal name
- limit_amount: budget limit (number)
- period: "daily" | "weekly" | "monthly" (for budgets)
- amount: transaction amount (number)
- merchant_raw: merchant/store name (string)
- description: transaction description
- target_amount: goal target amount (number)
- target_date: goal target date (ISO date string YYYY-MM-DD)
- goal_id: goal ID for allocation (UUID string)
- income_source_id: income source ID for allocation (UUID string)
- portfolio_holding_id: investment ID for allocation (UUID string)
- allocation_percentage: percentage to allocate (0-100)
- allocation_fixed_amount: fixed amount to allocate (number)
- reasoning: brief explanation

User message:
"{message}"

Recent transactions:
{transactions}

Example for transaction: {{"action": "create_transaction", "amount": 500, "merchant_raw": "Starbucks", "confidence": 0.9}}
Example for budget: {{"action": "create_budget", "name": "Food", "limit_amount": 5000, "period": "monthly", "confidence": 0.85}}
"""

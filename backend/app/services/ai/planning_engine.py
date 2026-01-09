# app/services/ai/planning_engine.py
from google import genai
from app.core.config import settings
from datetime import date
import json
import re
import logging

logger = logging.getLogger(__name__)
client = genai.Client(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are a financial planning AI.

Your job:
- Build a realistic financial plan
- DO NOT create anything
- DO NOT assume missing income
- Return ONLY valid JSON

Rules:
- Amounts in numbers only
- Dates ISO (YYYY-MM-DD)
- Be conservative
- Include reasoning fields
"""

def parse_goal(message: str):
    text = message.lower()

    # amount
    lakh = re.search(r"(\d+(\.\d+)?)\s*lakh", text)
    amount = float(lakh.group(1)) * 100000 if lakh else None

    # year
    year = re.search(r"(20\d{2})", text)
    target_year = int(year.group(1)) if year else None

    name = "Goal"
    if "innova" in text:
        name = "Buy Innova"

    return name, amount, target_year


async def generate_plan(
    message: str,
    financial_context: str,
):
    name, target_amount, target_year = parse_goal(message)

    if not target_amount or not target_year:
        return {
            "mode": "planning",
            "error": "Could not infer goal clearly",
        }

    today = date.today()
    months = (target_year - today.year) * 12 + (12 - today.month)
    monthly_required = round(target_amount / months, 2)

    prompt = f"""
{SYSTEM_PROMPT}

USER CONTEXT:
{financial_context}

GOAL:
Name: {name}
Target Amount: {target_amount}
Target Year: {target_year}
Months Available: {months}

Return JSON:
{{
  "mode": "planning",
  "goal": {{
    "name": "{name}",
    "target_amount": {target_amount},
    "target_date": "{target_year}-12-31"
  }},
  "calculation": {{
    "months": {months},
    "monthly_required": {monthly_required}
  }},
  "recommended_budgets": [
    {{ "name": "Food", "limit_amount": 15000 }},
    {{ "name": "Lifestyle", "limit_amount": 8000 }}
  ],
  "recommended_income_allocation": {{
    "percentage": 30
  }},
  "risks": [
    "Income variability",
    "Lifestyle inflation"
  ],
  "confidence": 0.92
}}
"""

    resp = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    text = resp.text.strip()
    if text.startswith("```"):
        text = text[text.find("{"):]

    return json.loads(text)

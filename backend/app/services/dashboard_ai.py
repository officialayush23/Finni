# app/services/dashboard_ai.py
from app.services.ai_service import generate_text

async def explain_dashboard(context: dict) -> str:
    prompt = f"""
You are a financial analyst.

User Dashboard Data:
{context}

Explain:
- Spending trends
- Budget health
- Investment performance
- Risks & opportunities

Use simple language.
"""
    return await generate_text(prompt)

# app/services/onboarding_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import (
    User,
    IncomeSource,
    PortfolioHolding,
    Budget,
)
from datetime import datetime
import uuid


class OnboardingService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def run(self, user_id: uuid.UUID, email: str, payload):
        # 1️⃣ Upsert User Profile
        user = await self.db.get(User, user_id)
        if not user:
            user = User(
                id=user_id,
                email=email,
                full_name=payload.profile.full_name,
                phone=payload.profile.phone,
                preferences={
                    "currency": payload.profile.currency,
                    "risk_profile": payload.profile.risk_profile,
                },
            )
            self.db.add(user)
        else:
            user.full_name = payload.profile.full_name
            user.phone = payload.profile.phone
            user.preferences.update({
                "currency": payload.profile.currency,
                "risk_profile": payload.profile.risk_profile,
            })

        # 2️⃣ Incomes (normalize yearly → monthly)
        for inc in payload.incomes:
            monthly = inc.yearly_amount / 12
            self.db.add(
                IncomeSource(
                    user_id=user_id,
                    name=inc.name,
                    source_type="salary",
                    rate_type="fixed",
                    estimated_monthly_amount=monthly,
                )
            )

        # 3️⃣ Investments
        for inv in payload.investments:
            self.db.add(
                PortfolioHolding(
                    user_id=user_id,
                    asset_type=inv.asset_type,
                    identifier=inv.identifier,
                    name=inv.name,
                    current_value=inv.current_value,
                    avg_buy_price=None,
                    metadata_={
                        "expected_return_pct": inv.expected_return_pct,
                        "pinned": inv.pinned,
                    },
                    last_api_fetch=datetime.utcnow(),
                )
            )

        # 4️⃣ Default Budgets
        prefs = payload.budget_preferences
        if prefs:
            if prefs.daily_food_budget:
                self.db.add(
                    Budget(
                        user_id=user_id,
                        name="Daily Food",
                        limit_amount=prefs.daily_food_budget,
                        period="daily",
                        metadata_={
                            "excluded_categories": prefs.exclude_from_food
                        },
                    )
                )

            if prefs.monthly_discretionary_budget:
                self.db.add(
                    Budget(
                        user_id=user_id,
                        name="Discretionary",
                        limit_amount=prefs.monthly_discretionary_budget,
                        period="monthly",
                    )
                )

        await self.db.commit()

# app/services/investment_engine.py
import yfinance as yf
from datetime import datetime
from app.models.all_models import PortfolioHolding


class InvestmentEngine:

    @staticmethod
    def fetch_price(asset_type: str, identifier: str) -> float | None:
        if asset_type in ["stock", "mutual_fund"]:
            ticker = yf.Ticker(identifier)
            price = ticker.fast_info.get("last_price")
            return float(price) if price else None

        # crypto placeholder (plug CoinGecko / Alchemy later)
        return None

    @staticmethod
    async def refresh_holding(holding: PortfolioHolding):
        price = InvestmentEngine.fetch_price(
            holding.asset_type, holding.identifier
        )
        if price:
            holding.current_value = price * float(holding.quantity)
            holding.last_api_fetch = datetime.utcnow()

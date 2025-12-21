# app/services/price_engine.py

import yfinance as yf
from datetime import datetime


async def fetch_stock_price(symbol: str) -> float:
    ticker = yf.Ticker(symbol)
    data = ticker.history(period="1d")
    return float(data.iloc[-1]["Close"])

# app/services/prediction_engine.py
import logging
from app.schemas.schemas import PredictionPoint, MetricCard
from app.core.config import settings

logger = logging.getLogger(__name__)

class PredictionEngine:
    def run_forecast(self, symbol: str, asset_type: str):
        # 🔒 SAFE MODE (Render / Demo)
        if not settings.ENABLE_HEAVY_ML:
            return self._mock_forecast(symbol)

        # 🔥 HEAVY IMPORTS (ONLY IF ENABLED)
        import yfinance as yf
        import pandas as pd
        from prophet import Prophet

        df = self._fetch_history(symbol, asset_type, yf, pd)
        if df.empty or len(df) < 30:
            raise ValueError("Not enough data")

        model = Prophet()
        model.fit(df)

        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)

        current_price = df.iloc[-1]["y"]
        future_price = forecast.iloc[-1]["yhat"]

        points = [
            PredictionPoint(
                date=row["ds"].strftime("%Y-%m-%d"),
                price=round(row["yhat"], 2),
                type="forecast",
            )
            for _, row in forecast.tail(30).iterrows()
        ]

        metrics = MetricCard(
            current_price=round(current_price, 2),
            predicted_price_30d=round(future_price, 2),
            growth_percentage=round(((future_price - current_price) / current_price) * 100, 2),
            risk_score=5.0,
        )

        return points, metrics

    def _fetch_history(self, symbol, asset_type, yf, pd):
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="2y")
            df = hist.reset_index()[["Date", "Close"]]
            df.columns = ["ds", "y"]
            df["ds"] = pd.to_datetime(df["ds"])
            return df
        except Exception as e:
            logger.error(e)
            return pd.DataFrame()

    def _mock_forecast(self, symbol: str):
        points = [
            PredictionPoint(
                date=f"2025-01-{i+1:02d}",
                price=100 + i,
                type="forecast",
            )
            for i in range(30)
        ]

        metrics = MetricCard(
            current_price=100.0,
            predicted_price_30d=130.0,
            growth_percentage=30.0,
            risk_score=4.0,
        )

        return points, metrics

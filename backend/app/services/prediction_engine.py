# CORE/app/services/prediction_engine.py

import yfinance as yf
import requests
import pandas as pd
from prophet import Prophet
from app.schemas.schemas import PredictionPoint, MetricCard
import logging

logger = logging.getLogger(__name__)

class PredictionEngine:
    def _fetch_history(self, symbol: str, asset_type: str) -> pd.DataFrame:
        try:
            if asset_type == "mutual_fund":
                url = f"https://api.mfapi.in/mf/{symbol}"
                data = requests.get(url).json()['data']
                df = pd.DataFrame(data)
                df = df.rename(columns={'date': 'ds', 'nav': 'y'})
                df['ds'] = pd.to_datetime(df['ds'], format='%d-%m-%Y')
                df['y'] = pd.to_numeric(df['y'])
                cutoff = pd.to_datetime('today') - pd.Timedelta(days=730)
                return df[df['ds'] > cutoff].sort_values(by='ds')
            else:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="2y")
                df = hist.reset_index()[['Date', 'Close']]
                df = df.rename(columns={'Date': 'ds', 'Close': 'y'})
                df['ds'] = pd.to_datetime(df['ds']).dt.tz_localize(None)
                return df
        except Exception as e:
            logger.error(f"Data fetch error: {e}")
            return pd.DataFrame()

    def run_forecast(self, symbol: str, asset_type: str) -> tuple[list[PredictionPoint], MetricCard]:
        df = self._fetch_history(symbol, asset_type)
        if df.empty or len(df) < 30:
            raise ValueError("Not enough data")

        model = Prophet(daily_seasonality=True, yearly_seasonality=True)
        model.fit(df)
        
        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)
        
        current_price = df.iloc[-1]['y']
        future_price = forecast.iloc[-1]['yhat']
        growth_pct = ((future_price - current_price) / current_price) * 100
        
        points = []
        # History
        for _, row in df.tail(30).iterrows():
            points.append(PredictionPoint(date=row['ds'].strftime("%Y-%m-%d"), price=round(row['y'], 2), type="history"))
        # Future
        for _, row in forecast.tail(30).iterrows():
            points.append(PredictionPoint(
                date=row['ds'].strftime("%Y-%m-%d"), price=round(row['yhat'], 2), type="forecast",
                confidence_lower=round(row['yhat_lower'], 2), confidence_upper=round(row['yhat_upper'], 2)
            ))
            
        metrics = MetricCard(
            current_price=round(current_price, 2), predicted_price_30d=round(future_price, 2),
            growth_percentage=round(growth_pct, 2), risk_score=5.0 # Simplified
        )
        return points, metrics
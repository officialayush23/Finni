# app/api/v1/endpoints/analysis.py
from fastapi import APIRouter, HTTPException
from app.services.prediction_engine import PredictionEngine
from app.services.news_engine import NewsEngine
from app.schemas.schemas import AnalysisResponse

router = APIRouter()

@router.get("/{symbol}", response_model=AnalysisResponse)
async def analyze_asset(symbol: str, asset_type: str = "stock"):
    try:
        predictor = PredictionEngine()
        news_engine = NewsEngine()

        points, metrics = predictor.run_forecast(symbol, asset_type)
        news = news_engine.fetch_and_analyze(symbol)

        return AnalysisResponse(
            symbol=symbol,
            graph_data=points,
            metrics=metrics,
            news=news,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

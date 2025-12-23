# app/services/news_engine.py
import logging
from app.schemas.schemas import NewsItem, SentimentType
from app.core.config import settings

logger = logging.getLogger(__name__)

class NewsEngine:
    def fetch_and_analyze(self, asset_name: str):
        # 🔒 SAFE MODE
        if not settings.ENABLE_HEAVY_ML:
            return [
                NewsItem(
                    title=f"{asset_name} shows stable outlook",
                    source="MockNews",
                    sentiment=SentimentType.NEUTRAL,
                    score=0.5,
                )
            ]

        # 🔥 HEAVY IMPORTS (ONLY IF ENABLED)
        from GoogleNews import GoogleNews
        from transformers import pipeline
        import torch

        device = 0 if torch.cuda.is_available() else -1
        classifier = pipeline(
            "sentiment-analysis",
            model="ProsusAI/finbert",
            device=device,
        )

        googlenews = GoogleNews(lang="en", region="IN")
        googlenews.search(f"{asset_name} financial news")
        results = googlenews.result()[:5]

        analyzed = []
        for item in results:
            pred = classifier(item["title"])[0]
            sentiment = (
                SentimentType.POSITIVE
                if pred["label"] == "positive"
                else SentimentType.NEGATIVE
            )

            analyzed.append(
                NewsItem(
                    title=item["title"],
                    source=item.get("media", "Google"),
                    sentiment=sentiment,
                    score=round(pred["score"], 2),
                )
            )

        return analyzed

# CORE/app/services/news_engine.py
from GoogleNews import GoogleNews
from transformers import pipeline
from app.schemas.schemas import NewsItem, SentimentType
import logging
import torch
logger = logging.getLogger(__name__)
device = 0 if torch.cuda.is_available() else -1
class NewsEngine:
    def __init__(self):
        self.googlenews = GoogleNews(lang='en', region='IN')
        try:
            # Load once to save resources
            self.classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert",device=device)
        except Exception as e:
            logger.error(f"FinBERT Load Error: {e}")
            self.classifier = None

    def fetch_and_analyze(self, asset_name: str) -> list[NewsItem]:
        self.googlenews.clear()
        self.googlenews.search(f"{asset_name} financial news")
        results = self.googlenews.result()[:5]
        
        analyzed = []
        for item in results:
            sentiment = SentimentType.NEUTRAL
            score = 0.0
            if self.classifier:
                try:
                    pred = self.classifier(item['title'])[0]
                    score = pred['score']
                    if pred['label'] == 'positive': sentiment = SentimentType.POSITIVE
                    elif pred['label'] == 'negative': sentiment = SentimentType.NEGATIVE
                except: pass
            
            analyzed.append(NewsItem(
                title=item['title'], source=item.get('media', 'Google'),
                sentiment=sentiment, score=round(score, 2)
            ))
        return analyzed
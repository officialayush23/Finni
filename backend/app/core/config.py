# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartFinance AI"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True

    DATABASE_URL: str
    REDIS_URL: str

    SUPABASE_JWT_SECRET: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    JWT_ALGORITHM: str = "HS256"
    SECRET_KEY: str = ""

    CORS_ORIGINS: str
    GEMINI_API_KEY: str | None = None

    @property
    def all_cors_origins(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",")]

    def model_post_init(self, __context):
        if not self.SECRET_KEY:
            self.SECRET_KEY = self.SUPABASE_JWT_SECRET

    class Config:
        env_file = ".env"
        extra = "ignore"
        case_sensitive = True

settings = Settings()

# app/core/config.py

from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    # --- App Info ---
    PROJECT_NAME: str = "SmartFinance AI"
    APP_NAME: str = "SmartFinance AI"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True
    ENABLE_HEAVY_ML: bool = False 
    
    # --- Security & Auth ---
    # We map SECRET_KEY to SUPABASE_JWT_SECRET because that is what signs your tokens
    SUPABASE_JWT_SECRET: str
    SECRET_KEY: str = ""  # Will be populated in __init__
    
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    
    # --- Database ---
    DATABASE_URL: str
    
    # --- Redis ---
    REDIS_URL: str
    
    # --- Supabase Public/Service Keys ---
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    # Note: SUPABASE_URL is not in your .env, but usually derived or added. 
    # If you need it, add SUPABASE_URL=... to .env
    
    # --- AI ---
    GEMINI_API_KEY: str
    
    # --- CORS ---
    CORS_ORIGINS: str

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        """
        Ensures we use the async driver (postgresql+asyncpg) 
        even if .env says postgresql://
        """
        if self.DATABASE_URL and self.DATABASE_URL.startswith("postgresql://"):
            return self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
        return self.DATABASE_URL

    @property
    def all_cors_origins(self) -> List[str]:
        """Parses the comma-separated string into a list"""
        if isinstance(self.CORS_ORIGINS, str):
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
        return []

    def model_post_init(self, __context):
        """
        After loading .env, verify SECRET_KEY is set.
        If not, default it to SUPABASE_JWT_SECRET.
        """
        if not self.SECRET_KEY and self.SUPABASE_JWT_SECRET:
            self.SECRET_KEY = self.SUPABASE_JWT_SECRET

    class Config:
        env_file = ".env"
        extra = "ignore" # Ignore extra fields in .env if any
        case_sensitive = True

settings = Settings()
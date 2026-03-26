import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ET News Backend - Bug busters"
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    MODEL_NAME: str = "llama-3.3-70b-versatile" # Fast, highly capable model for text tasks

    class Config:
        env_file = ".env"

settings = Settings()
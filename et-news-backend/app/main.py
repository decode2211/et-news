from fastapi import FastAPI
from app.api.routes import router as api_router
from app.core.config import settings
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Agentic Backend for Personalized Business News",
    version="1.0.0"
)

# Include the API router
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Bug busters AI-Native News API is running. Go to /docs for Swagger UI."}
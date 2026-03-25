from fastapi import APIRouter, HTTPException
from app.models.schemas import NewsRequest, ProcessedNewsResponse
from app.agents.pipeline import run_news_pipeline

router = APIRouter()

@router.post("/process-news", response_model=ProcessedNewsResponse)
async def process_news_endpoint(request: NewsRequest):
    try:
        result = await run_news_pipeline(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
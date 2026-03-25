from fastapi import APIRouter, HTTPException
from app.models.schemas import UserProfile, ProcessedNewsResponse, NewsRequest
from app.agents.pipeline import run_news_pipeline
from app.services.database import search_articles_by_persona

router = APIRouter()

# Notice we changed the input to ONLY ask for the UserProfile
@router.post("/process-news", response_model=ProcessedNewsResponse)
async def process_news_endpoint(user: UserProfile):
    try:
        # 1. The Autonomous Step: Fetch relevant articles from ChromaDB
        relevant_articles = search_articles_by_persona(user.interests, limit=3)
        
        if not relevant_articles:
            raise HTTPException(status_code=404, detail="No relevant articles found in the database.")

        # 2. Package the DB results and the user profile for the Agent Pipeline
        pipeline_request = NewsRequest(articles=relevant_articles, user=user)
        
        # 3. Run the multi-agent synthesis and personalization
        result = await run_news_pipeline(pipeline_request)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
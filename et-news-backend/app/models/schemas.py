from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class RawArticle(BaseModel):
    id: str
    title: str
    content: str
    url: Optional[str] = None

class UserProfile(BaseModel):
    persona: str
    interests: List[str]

class NewsRequest(BaseModel):
    articles: List[RawArticle]
    user: UserProfile

class ProcessedNewsResponse(BaseModel):
    custom_headline: str
    personalized_briefing: str
    why_it_matters: List[str]
    metadata: Dict[str, Any]
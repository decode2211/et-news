from app.models.schemas import NewsRequest
from app.agents.extraction import get_extraction_chain
from app.agents.synthesis import get_synthesis_chain
from app.agents.personalization import get_personalization_chain

async def run_news_pipeline(request: NewsRequest) -> dict:
    extraction_chain = get_extraction_chain()
    synthesis_chain = get_synthesis_chain()
    personalization_chain = get_personalization_chain()
    
    analyzed_articles = []
    
    # Step 1: Extraction
    for article in request.articles:
        extracted_data = extraction_chain.invoke({"article_text": article.content})
        analyzed_articles.append({
            "title": article.title,
            "metadata": extracted_data
        })
        
    # Step 2: Synthesis
    synthesis_input = str(analyzed_articles) 
    synthesized_briefing = synthesis_chain.invoke({"analyzed_data": synthesis_input})
    
    # Step 3: Personalization
    final_output = personalization_chain.invoke({
        "persona": request.user.persona,
        "interests": ", ".join(request.user.interests),
        "briefing": synthesized_briefing.content
    })
    
    # Add metadata for the frontend
    final_output['metadata'] = {
        "articles_processed": len(request.articles),
        "dominant_sentiment": analyzed_articles[0]['metadata'].get('sentiment', 'Neutral') if analyzed_articles else 'Neutral'
    }
    # NEW: Attach the raw articles so the frontend can display clickable cards
    final_output['source_articles'] = request.articles

    
    return final_output
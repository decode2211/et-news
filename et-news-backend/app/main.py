import asyncio
from fastapi import FastAPI
from app.api.routes import router as api_router
from app.core.config import settings
from ingest_live_data import scrape_et_news
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title=settings.PROJECT_NAME)
app.include_router(api_router, prefix="/api")

# --- THE AUTONOMOUS SCRAPER LOOP ---
async def run_scraper_periodically():
    while True:
        try:
            print("Running scheduled news ingestion...")
            scrape_et_news() # Fetches and saves new articles to ChromaDB
        except Exception as e:
            print(f"Scraper error: {e}")
        # Wait 2 hours (7200 seconds) before scraping again
        await asyncio.sleep(7200) 

@app.on_event("startup")
async def startup_event():
    # Start the background scraper as soon as the server boots up
    asyncio.create_task(run_scraper_periodically())

@app.get("/")
async def root():
    return {"message": "AI-Native News API is running."}
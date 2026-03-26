import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.core.config import settings
from ingest_live_data import scrape_et_news
from dotenv import load_dotenv

load_dotenv()

# --- BACKGROUND TASK LOGIC ---
async def run_scraper_periodically():
    """Runs the autonomous news ingestion every 2 hours."""
    while True:
        try:
            print("--- [SCRAPER] Running scheduled news ingestion... ---")
            # Ensure this is non-blocking if scrape_et_news is heavy
            # If scrape_et_news is synchronous, consider running in a thread:
            # await asyncio.to_thread(scrape_et_news)
            scrape_et_news() 
            print("--- [SCRAPER] Ingestion complete. ---")
        except Exception as e:
            print(f"--- [SCRAPER ERROR] {e} ---")
        
        # Wait 2 hours (7200 seconds)
        await asyncio.sleep(7200)

# --- LIFESPAN MANAGER ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Start the background scraper task
    scraper_task = asyncio.create_task(run_scraper_periodically())
    print("--- [SYSTEM] Backend started & Scraper task initialized. ---")
    yield
    # Shutdown: Clean up the task if necessary
    scraper_task.cancel()
    print("--- [SYSTEM] Backend shutting down. ---")

# --- APP INITIALIZATION ---
app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# --- CORS CONFIGURATION ---
# This allows your Next.js frontend (port 3000) to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "AI-Native News API is running.",
        "version": "1.0.0"
    }
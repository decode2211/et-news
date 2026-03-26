import feedparser
from bs4 import BeautifulSoup
import uuid
from app.models.schemas import RawArticle
from app.services.database import add_articles_to_db

# Official Economic Times RSS Feeds
RSS_FEEDS = [
    "https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms",       # Tech & IT
    "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",   # Markets
    "https://economictimes.indiatimes.com/wealth/rssfeeds/8371324.cms"        # Wealth & Finance
]

def clean_html(raw_html: str) -> str:
    """Removes HTML tags from the summary text to feed clean data to the AI."""
    if not raw_html:
        return ""
    soup = BeautifulSoup(raw_html, "html.parser")
    return soup.get_text(separator=" ", strip=True)

def scrape_et_news():
    print("Starting live data ingestion from Economic Times...")
    live_articles = []
    
    for feed_url in RSS_FEEDS:
        print(f"Fetching: {feed_url.split('/')[-2]}")
        feed = feedparser.parse(feed_url)
        
        # Grab the top 15 articles from each feed to build a solid database
        for entry in feed.entries[:15]:
            # Clean the text
            clean_content = clean_html(entry.get('summary', ''))
            
            # Skip articles that are too short (like pure image galleries)
            if len(clean_content) < 50:
                continue
                
            # Create a unique, repeatable ID based on the article's URL
            # Create a unique, repeatable ID based on the article's URL
            article_id = str(uuid.uuid5(uuid.NAMESPACE_URL, entry.link))
            
            # The name of the feed (Tech, Markets, Wealth)
            feed_name = feed_url.split('/')[-2].capitalize()
            
            article = RawArticle(
                id=article_id,
                title=entry.get('title', 'No Title'),
                content=clean_content,
                url=entry.link,
                published_date=entry.get('published', 'Recent'), # GRAB THE DATE
                source_feed=feed_name                            # GRAB THE SOURCE
            )
            live_articles.append(article)
            
    print(f"\nSuccessfully scraped and cleaned {len(live_articles)} real articles.")
    
    if live_articles:
        print("Embedding articles and saving to ChromaDB brain...")
        # This function from your database.py handles the vector embeddings automatically!
        add_articles_to_db(live_articles)
        print("\n✅ Live database update complete! The AI is now reading today's news.")
    else:
        print("No articles found to ingest.")

if __name__ == "__main__":
    scrape_et_news()
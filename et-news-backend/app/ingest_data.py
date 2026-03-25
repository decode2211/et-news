from app.models.schemas import RawArticle
from app.services.database import add_articles_to_db

# Mocking some recent, realistic ET Business News
mock_et_data = [
    RawArticle(
        id="et-001",
        title="RBI keeps repo rate unchanged at 6.5%, signals pivot on inflation",
        content="The Reserve Bank of India's Monetary Policy Committee voted to keep the benchmark repo rate unchanged. Governor Shaktikanta Das indicated a shift in stance to 'neutral', signaling potential rate cuts in the future as inflation aligns with targets. This brings relief to the real estate and auto sectors.",
        url="https://economictimes.indiatimes.com/markets/rbi"
    ),
    RawArticle(
        id="et-002",
        title="Indian SaaS startups pivot to AI-first models amid funding winter",
        content="Venture capital funding for traditional SaaS has dried up, forcing Indian tech founders to pivot. Companies are now embedding Generative AI directly into their core workflows to justify enterprise valuations. Sequoia and Peak XV partners note that agentic workflows are now table stakes for Series A rounds.",
        url="https://economictimes.indiatimes.com/tech/startups"
    ),
    RawArticle(
        id="et-003",
        title="Reliance Industries reports 12% jump in Q3 profit, led by Jio and Retail",
        content="Mukesh Ambani's Reliance Industries posted strong quarterly earnings, largely driven by subscriber additions in telecom arm Jio and massive footfalls in Reliance Retail. The oil-to-chemicals business remained subdued due to lower refining margins globally.",
        url="https://economictimes.indiatimes.com/industry/reliance"
    ),
    RawArticle(
        id="et-004",
        title="Government mandates green hydrogen blending for fertilizer plants",
        content="In a push towards net-zero emissions, the Ministry of New and Renewable Energy has mandated that all major fertilizer plants must blend at least 5% green hydrogen into their feedstock by next year. This is expected to spur massive investments in electrolyzer manufacturing.",
        url="https://economictimes.indiatimes.com/industry/renewables"
    )
]

print("Initializing Embedding Model and loading data into ChromaDB...")
add_articles_to_db(mock_et_data)
print("Done! Your vector database is now populated.")
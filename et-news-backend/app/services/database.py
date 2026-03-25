import os
import chromadb
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from app.models.schemas import RawArticle

# We use a fast, free, local embedding model to turn text into vectors
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# This creates a folder called 'chroma_db' in your project root to save the data permanently
db_path = os.path.join(os.getcwd(), "chroma_db")
chroma_client = chromadb.PersistentClient(path=db_path)

def get_vector_store():
    """Connects to the Chroma collection."""
    return Chroma(
        client=chroma_client,
        collection_name="et_news_articles",
        embedding_function=embeddings
    )

def add_articles_to_db(articles: list[RawArticle]):
    """Embeds and saves articles into ChromaDB."""
    vector_store = get_vector_store()
    
    texts = [article.content for article in articles]
    metadatas = [{"id": article.id, "title": article.title, "url": article.url or ""} for article in articles]
    ids = [article.id for article in articles]
    
    vector_store.add_texts(texts=texts, metadatas=metadatas, ids=ids)
    print(f"Successfully added {len(articles)} articles to the vector database.")
    return len(articles)

def search_articles_by_persona(user_interests: list[str], limit: int = 5):
    """Searches the database for articles matching the user's interests."""
    vector_store = get_vector_store()
    
    # Combine the user's interests into a single search query
    query = " ".join(user_interests)
    
    # Perform a semantic search
    results = vector_store.similarity_search(query, k=limit)
    
    # Convert Langchain Document objects back into our RawArticle schema
    formatted_results = []
    for doc in results:
        formatted_results.append(RawArticle(
            id=doc.metadata.get("id", "unknown"),
            title=doc.metadata.get("title", "No Title"),
            content=doc.page_content,
            url=doc.metadata.get("url", "")
        ))
        
    return formatted_results
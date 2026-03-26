from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser
from app.core.config import settings

def get_extraction_chain():
    llm = ChatGroq(temperature=0.1, model_name=settings.MODEL_NAME, groq_api_key=settings.GROQ_API_KEY)
    
    prompt = PromptTemplate(
        template="""Analyze the following news article. 
        Extract key entities (Companies, People), determine the primary sector, and assess market sentiment (Bullish, Bearish, Neutral).
        Respond ONLY with a valid JSON object containing the keys: 'entities' (list), 'sector' (string), 'sentiment' (string).
        
        Article: {article_text}
        """,
        input_variables=["article_text"]
    )
    return prompt | llm | JsonOutputParser()
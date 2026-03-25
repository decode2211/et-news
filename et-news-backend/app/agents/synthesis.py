from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from app.core.config import settings

def get_synthesis_chain():
    llm = ChatGroq(temperature=0.3, model_name=settings.MODEL_NAME, groq_api_key=settings.GROQ_API_KEY)
    
    prompt = PromptTemplate(
        template="""You are a top-tier financial analyst. Take the following raw news articles and their extracted metadata, 
        and synthesize them into a single, cohesive 'Deep Briefing' (approx 150-200 words). 
        Focus on the macro impact, connect the dots between the stories, and remove redundant information.
        
        Data to synthesize: {analyzed_data}
        
        Synthesized Briefing:""",
        input_variables=["analyzed_data"]
    )
    return prompt | llm
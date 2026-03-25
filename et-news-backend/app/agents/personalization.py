from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser
from app.core.config import settings

def get_personalization_chain():
    llm = ChatGroq(temperature=0.4, model_name=settings.MODEL_NAME, groq_api_key=settings.GROQ_API_KEY)
    
    prompt = PromptTemplate(
        template="""You are a personalized news editor. You have a synthesized business briefing and a target user profile.
        Rewrite the briefing to directly appeal to this user. 
        
        User Profile: {persona} interested in {interests}
        General Briefing: {briefing}
        
        Respond ONLY with a JSON object containing these exact keys: 
        'custom_headline': (String), 
        'personalized_briefing': (String), 
        'why_it_matters': (A LIST of 3 strings containing actionable takeaways).
        """,
        input_variables=["persona", "interests", "briefing"]
    )
    return prompt | llm | JsonOutputParser()
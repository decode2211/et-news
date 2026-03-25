import requests
import json

url = "http://127.0.0.1:8000/api/process-news"

mock_payload = {
    "articles": [
        {
            "id": "101",
            "title": "New Deep Learning Models Break Inference Speed Records",
            "content": "Major tech firms announced a breakthrough in machine learning infrastructure today. The new architecture drastically reduces the compute required for large language models, making agentic workflows faster and cheaper for developers.",
            "url": "https://economictimes.indiatimes.com/tech/ai-breakthrough"
        },
        {
            "id": "102",
            "title": "UEFA Champions League Quarter-Finals Draw Revealed",
            "content": "The Champions League heats up as the final eight teams are drawn. Analysts predict a massive surge in sports broadcasting revenues this quarter, impacting media stocks across Europe.",
            "url": "https://economictimes.indiatimes.com/sports/ucl-draw"
        }
    ],
    "user": {
        "persona": "Computer Science Student",
        "interests": ["Artificial Intelligence", "Football Analytics", "Tech Startups"]
    }
}

print("Sending request to Bug busters Agent Pipeline...")
response = requests.post(url, json=mock_payload)

if response.status_code == 200:
    print("\n✅ SUCCESS! Here is the Agent's Output:\n")
    print(json.dumps(response.json(), indent=4))
else:
    print(f"\n❌ ERROR: {response.status_code}")
    print(response.text)
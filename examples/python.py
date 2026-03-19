import os
import requests

endpoint = os.getenv('MANA_URL', 'http://localhost:3001/chat')
response = requests.post(endpoint, json={'message': 'Give me a short description of Mana.'}, timeout=30)
print(response.json())

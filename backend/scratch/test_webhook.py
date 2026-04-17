import requests

url = "https://your-deployment-domain.com/api/webhook/"
params = {
    "hub.mode": "subscribe",
    "hub.verify_token": "insta123",
    "hub.challenge": "ch_1234567890"
}
try:
    response = requests.get(url, params=params)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")

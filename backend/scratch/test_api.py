import requests

url = "http://127.0.0.1:8000/api/pick-comment/"
payload = {
    "url": "https://www.instagram.com/reel/DE-R0k0x94s/",
    "mode": "random"
}
res = requests.post(url, json=payload)
print(res.status_code)
print(res.json())

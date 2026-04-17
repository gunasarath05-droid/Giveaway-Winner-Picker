import requests

url = "https://giveaway-winner-picker.onrender.com/api/pick-comment/"
payload = {
    "url": "https://www.instagram.com/reel/DE-R0k0x94s/",
    "mode": "random"
}
res = requests.post(url, json=payload)
print(res.status_code)
print(res.json())

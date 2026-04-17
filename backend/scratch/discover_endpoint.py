import requests
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("RAPIDAPI_KEY")
host = os.getenv("RAPIDAPI_HOST")

headers = {
    "x-rapidapi-key": key,
    "x-rapidapi-host": host,
}

# Common patterns for Instagram Scrapers
endpoints = [
    {"url": f"https://{host}/post/comments", "method": "GET", "params": {"shortcode": "BsOGZrhnMu-"}},
    {"url": f"https://{host}/comments", "method": "GET", "params": {"shortcode": "BsOGZrhnMu-"}},
    {"url": f"https://{host}/api/instagram/comments", "method": "GET", "params": {"shortcode": "BsOGZrhnMu-"}},
    {"url": f"https://{host}/api/v1/comments", "method": "GET", "params": {"shortcode": "BsOGZrhnMu-"}},
    {"url": f"https://{host}/post/comments", "method": "POST", "payload": {"shortcode": "BsOGZrhnMu-"}},
    # Try different param names
    {"url": f"https://{host}/post/comments", "method": "GET", "params": {"code": "BsOGZrhnMu-"}},
    {"url": f"https://{host}/comments", "method": "GET", "params": {"media_id": "BsOGZrhnMu-"}},
    # Try without prefix
    {"url": f"https://{host}/get_post_comments.php", "method": "GET", "params": {"media_code": "BsOGZrhnMu-"}},
]

print(f"Brute-forcing endpoints for HOST: {host}\n")

for ep in endpoints:
    print(f"Testing {ep['method']} {ep['url']} with {ep.get('params') or ep.get('payload')}...")
    try:
        if ep['method'] == 'GET':
            res = requests.get(ep['url'], params=ep.get('params'), headers=headers, timeout=10)
        else:
            res = requests.post(ep['url'], json=ep.get('payload'), headers=headers, timeout=10)
        
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            print("SUCCESS!")
            print(f"Keys: {list(res.json().keys()) if isinstance(res.json(), dict) else 'Not Dict'}")
            break
        elif res.status_code == 404:
            pass # Keep trying
        else:
            print(f"Response: {res.text[:100]}")
    except Exception as e:
        print(f"Error: {e}")

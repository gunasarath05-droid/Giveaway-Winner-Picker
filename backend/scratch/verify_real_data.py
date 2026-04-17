import os
import sys

# Add the backend path to sys.path
sys.path.append(os.getcwd())

import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from comments.services.instagram_service import instagram_service

def test_fetch_real():
    url = "https://www.instagram.com/p/BsOGZrhnMu-/"
    print(f"Testing REAL fetch with HOST: {os.getenv('RAPIDAPI_HOST')}")
    try:
        comments = instagram_service.fetch_comments(url)
        print(f"Result length: {len(comments)}")
        if comments:
            # Check if first user is photography_lover (our mock)
            is_mock = any(c['username'] == 'photography_lover' for c in comments)
            print(f"Is Mock Data? {is_mock}")
            if not is_mock:
                print("REAL DATA RECEIVED!")
                print("Sample:", comments[0])
            else:
                print("Still getting mock data. Check server logs for API errors.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_fetch_real()

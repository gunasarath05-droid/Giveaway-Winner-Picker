import requests
from .models import Reel, Comment

class InstagramAPIService:
    BASE_URL = "https://graph.facebook.com/v18.0"

    def __init__(self, access_token):
        self.access_token = access_token

    def fetch_user_reels(self, instagram_business_id):
        """
        Fetches media for the given IG Business Account.
        Filters for reels (VIDEO media_type).
        """
        endpoint = f"{self.BASE_URL}/{instagram_business_id}/media"
        params = {
            "fields": "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count",
            "access_token": self.access_token
        }
        res = requests.get(endpoint, params=params)
        data = res.json()

        if "data" not in data:
            return []

        reels = []
        for item in data["data"]:
            if item.get("media_type") == "VIDEO":
                reels.append(item)
        
        return reels

    def fetch_comments(self, media_id):
        """
        Fetches comments for a specific media item.
        """
        endpoint = f"{self.BASE_URL}/{media_id}/comments"
        params = {
            "fields": "id,text,timestamp,like_count",
            "access_token": self.access_token
        }
        res = requests.get(endpoint, params=params)
        data = res.json()

        return data.get("data", [])

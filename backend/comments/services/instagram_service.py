import re
import requests
from typing import List, Dict, Any
from authentication.models import InstagramProfile

class InstagramService:
    def __init__(self):
        pass

    def extract_shortcode(self, url: str) -> str:
        """
        Extracts the shortcode from various Instagram URL formats.
        """
        patterns = [
            r'instagram\.com/p/([^/?#&]+)',
            r'instagram\.com/reels?/([^/?#&]+)',
            r'instagram\.com/tv/([^/?#&]+)',
            r'instagr\.am/p/([^/?#&]+)'
        ]

        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)

        # Fallback: last path segment
        match = re.search(r'/([^/?#&]+)/?$', url.strip('/'))
        if match:
            return match.group(1)

        return url

    def fetch_comments(self, url: str) -> List[Dict[str, Any]]:
        """
        Fetches comments for a given Instagram post URL using the Official Meta Graph API.
        Requires an authenticated InstagramProfile in the database.
        """
        profile = InstagramProfile.objects.first()
        if not profile:
            raise Exception("No Instagram account linked. Please login via the Dashboard first.")
            
        shortcode = self.extract_shortcode(url)
        
        # 1. Look for the media_id matching the shortcode
        media_id = None
        media_url = f"https://graph.facebook.com/v19.0/{profile.instagram_user_id}/media"
        params = {
            "fields": "shortcode,id", 
            "access_token": profile.access_token
        }
        
        while media_url and not media_id:
            res = requests.get(media_url, params=params)
            if res.status_code != 200:
                err = res.json().get('error', {})
                raise Exception(f"Graph API Error: {err.get('message', res.text)}")
                
            data = res.json()
            if 'data' in data:
                for m in data['data']:
                    if m.get('shortcode') == shortcode:
                        media_id = m.get('id')
                        break
                        
            if media_id:
                break
                
            # Clear params because 'next' URL already contains access_token and fields
            params = {}
            media_url = data.get('paging', {}).get('next')
            
        if not media_id:
            raise Exception("Media not found in the linked account. The Official API only supports fetching comments for the linked account's posts.")
            
        # 2. Fetch comments for the media_id
        comments_url = f"https://graph.facebook.com/v19.0/{media_id}/comments"
        params = {
            "fields": "from,text,like_count",
            "access_token": profile.access_token
        }
        
        comments = []
        while comments_url:
            res = requests.get(comments_url, params=params)
            if res.status_code != 200:
                err = res.json().get('error', {})
                raise Exception(f"Graph API Error while fetching comments: {err.get('message', res.text)}")
                
            data = res.json()
            if 'data' in data:
                for c in data['data']:
                    user_obj = c.get('from', {})
                    text = c.get('text', '')
                    username = user_obj.get('username', 'anonymous')
                    likes = c.get('like_count', 0)
                    
                    if text and username:
                        comments.append({
                            "username": username,
                            "comment": text,
                            "likes": likes
                        })
                        
            params = {}
            comments_url = data.get('paging', {}).get('next')
            
        # Deduplication just in case
        seen = set()
        unique_comments = []
        for c in comments:
            key = (c["username"], c["comment"])
            if key not in seen:
                seen.add(key)
                unique_comments.append(c)
                
        return unique_comments

# Singleton instance
instagram_service = InstagramService()

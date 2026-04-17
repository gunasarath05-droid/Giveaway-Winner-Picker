from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Reel, Comment
from .services import InstagramAPIService
from authentication.models import InstagramProfile
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg

class ReelsListView(APIView):
    # permission_classes = [IsAuthenticated] # Enable once auth is fully integrated

    def get(self, request):
        # For demo, we get the first profile. In production, use request.user.instagram_profile
        profile = InstagramProfile.objects.first()
        if not profile:
            return Response({"error": "No Instagram profile found. Please login first."}, status=status.HTTP_400_BAD_REQUEST)

        api_service = InstagramAPIService(profile.access_token)
        reels_data = api_service.fetch_user_reels(profile.instagram_user_id)

        # Sync with database
        synced_reels = []
        for rd in reels_data:
            reel, created = Reel.objects.update_or_create(
                media_id=rd['id'],
                defaults={
                    "profile": profile,
                    "media_url": rd.get('media_url', ''),
                    "permalink": rd.get('permalink', ''),
                    "media_type": rd.get('media_type', 'VIDEO'),
                    "caption": rd.get('caption', ''),
                    "like_count": rd.get('like_count', 0),
                    "comments_count": rd.get('comments_count', 0),
                    "timestamp": rd.get('timestamp')
                }
            )
            synced_reels.append({
                "id": reel.media_id,
                "media_url": reel.media_url,
                "permalink": reel.permalink,
                "caption": reel.caption,
                "like_count": reel.like_count,
                "comments_count": reel.comments_count,
                "timestamp": reel.timestamp
            })

        return Response(synced_reels)

class ReelCommentsView(APIView):
    def get(self, request, media_id):
        profile = InstagramProfile.objects.first()
        if not profile:
            return Response({"error": "No profile found"}, status=status.HTTP_404_NOT_FOUND)

        reel = Reel.objects.filter(media_id=media_id).first()
        if not reel:
            return Response({"error": "Reel not found"}, status=status.HTTP_404_NOT_FOUND)

        api_service = InstagramAPIService(profile.access_token)
        comments_data = api_service.fetch_comments(media_id)

        # Sync comments
        synced_comments = []
        for cd in comments_data:
            comment, created = Comment.objects.update_or_create(
                comment_id=cd['id'],
                defaults={
                    "reel": reel,
                    "text": cd.get('text', ''),
                    "timestamp": cd.get('timestamp'),
                    "like_count": cd.get('like_count', 0)
                }
            )
            synced_comments.append({
                "id": comment.comment_id,
                "text": comment.text,
                "timestamp": comment.timestamp,
                "like_count": comment.like_count
            })

        return Response(synced_comments)

class DashboardStatsView(APIView):
    def get(self, request):
        profile = InstagramProfile.objects.first()
        if not profile:
            return Response({"error": "No profile found"}, status=status.HTTP_200_OK)

        reels = Reel.objects.filter(profile=profile)
        total_reels = reels.count()
        total_likes = reels.aggregate(Sum('like_count'))['like_count__sum'] or 0
        total_comments = reels.aggregate(Sum('comments_count'))['comments_count__sum'] or 0
        
        # Calculate average sentiment (simulated for now, would use analysis app)
        avg_sentiment = 84 

        return Response({
            "total_reels": total_reels,
            "total_likes": total_likes,
            "total_comments": total_comments,
            "avg_sentiment": avg_sentiment,
            "profile_username": profile.username or "Instagram User"
        })

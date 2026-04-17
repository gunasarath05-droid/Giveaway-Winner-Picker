from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from reels.models import Reel, Comment
from .services import AnalysisService

class ReelAnalysisView(APIView):
    def get(self, request, media_id):
        reel = Reel.objects.filter(media_id=media_id).first()
        if not reel:
            return Response({"error": "Reel not found"}, status=status.HTTP_404_NOT_FOUND)

        comments = Comment.objects.filter(reel=reel)
        if not comments.exists():
            return Response({"error": "No comments found for analysis. Please fetch comments first."}, status=status.HTTP_400_BAD_REQUEST)

        comment_list = [{"text": c.text} for c in comments]
        
        analysis_service = AnalysisService()
        keywords = analysis_service.extract_keywords(comment_list)
        sentiment = analysis_service.analyze_sentiment(comment_list)

        return Response({
            "media_id": media_id,
            "total_comments": comments.count(),
            "top_keywords": keywords,
            "sentiment": sentiment
        })

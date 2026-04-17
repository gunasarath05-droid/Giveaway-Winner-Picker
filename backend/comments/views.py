import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CommentRequestSerializer, CommentResponseSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

from .services.instagram_service import instagram_service

# AI scoring logic remains same
def score_comment(comment_text):
    """
    Simple AI scoring logic:
    - Length bonus (up to a limit)
    - Keyword bonuses (positive sentiment)
    - Emoji bonuses
    """
    score = 0.1
    length = len(comment_text)
    if length > 20: score += 0.2
    if length > 50: score += 0.1
    
    keywords = ["amazing", "love", "stunning", "great", "best", "magical", "beautiful", "thanks", "breathtaking", "composition"]
    for word in keywords:
        if word in comment_text.lower():
            score += 0.15
            
    emojis = ["😍", "🔥", "❤️", "🙌", "✨", "📸", "🎨", "☀️", "🌊", "⚡"]
    for emoji in emojis:
        if emoji in comment_text:
            score += 0.1
            
    return min(1.0, score)

class PickCommentView(APIView):
    def post(self, request):
        serializer = CommentRequestSerializer(data=request.data)
        if serializer.is_valid():
            url = serializer.validated_data['url']
            mode = serializer.validated_data['mode']
            
            try:
                # Fetch real comments
                fetched_comments = instagram_service.fetch_comments(url)
                
                if not fetched_comments:
                    return Response({"error": "No comments found on this post."}, status=status.HTTP_404_NOT_FOUND)
                    
                winners = []
                limit = 10
                
                # Prepare internal data with scores for all modes
                all_comments = []
                for c in fetched_comments:
                    c_copy = c.copy()
                    c_copy['score'] = score_comment(c['comment'])
                    all_comments.append(c_copy)
                
                if mode == 'random':
                    winners = random.sample(all_comments, min(len(all_comments), limit))
                elif mode == 'most_liked':
                    winners = sorted(all_comments, key=lambda x: x['likes'], reverse=True)[:limit]
                elif mode == 'ai':
                    winners = sorted(all_comments, key=lambda x: x['score'], reverse=True)[:limit]
                
                return Response(winners, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

VERIFY_TOKEN = "insta123"

@csrf_exempt
def webhook(request):
    if request.method == "GET":
        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")

        print("MODE:", mode)
        print("TOKEN:", token)
        print("CHALLENGE:", challenge)

        if mode == "subscribe" and token == VERIFY_TOKEN:
            return HttpResponse(challenge)

        if request.headers.get("User-Agent", "").startswith("facebookexternalhit") and challenge:
            return HttpResponse(challenge)

        return HttpResponse("Verification failed", status=403)

    elif request.method == "POST":
        print("Webhook event received:", request.body)
        return HttpResponse("EVENT_RECEIVED")

    return HttpResponse("OK")
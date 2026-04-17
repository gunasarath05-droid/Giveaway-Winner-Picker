import requests
from django.conf import settings
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import InstagramProfile
import os
import urllib.parse
from dotenv import load_dotenv

class InstagramLoginView(APIView):
    def get(self, request):
        load_dotenv(override=True) # Ensure latest env vars are loaded
        app_id = os.getenv('INSTAGRAM_APP_ID')
        redirect_uri = os.getenv('INSTAGRAM_REDIRECT_URI')
        scope = "instagram_basic,instagram_manage_comments,instagram_manage_insights,pages_read_engagement,pages_show_list,instagram_content_publish"
        
        auth_url = (
            f"https://www.facebook.com/v19.0/dialog/oauth?"
            f"client_id={app_id}&"
            f"redirect_uri={redirect_uri}&"
            f"scope={scope}&"
            f"response_type=code"
        )
        return Response({"auth_url": auth_url})

class InstagramCallbackView(APIView):
    def get(self, request):
        load_dotenv(override=True) # Ensure latest env vars are loaded
        
        code = request.GET.get('code')
        if not code:
            return redirect("http://localhost:3000/login?error=" + urllib.parse.quote("No code provided from Facebook"))

        app_id = os.getenv('INSTAGRAM_APP_ID')
        app_secret = os.getenv('INSTAGRAM_APP_SECRET')
        redirect_uri = os.getenv('INSTAGRAM_REDIRECT_URI')

        # 1. Exchange code for short-lived access token
        token_url = "https://graph.facebook.com/v19.0/oauth/access_token"
        token_params = {
            "client_id": app_id,
            "client_secret": app_secret,
            "redirect_uri": redirect_uri,
            "code": code,
        }
        token_res = requests.get(token_url, params=token_params)
        token_data = token_res.json()

        if "access_token" not in token_data:
            err_msg = token_data.get('error', {}).get('message', 'Failed to exchange token')
            return redirect("http://localhost:3000/login?error=" + urllib.parse.quote(err_msg))

        access_token = token_data["access_token"]

        # 2. Get User Info (and find linked IG accounts)
        me_url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={access_token}"
        me_res = requests.get(me_url)
        me_data = me_res.json()

        if "data" not in me_data or not me_data["data"]:
            return redirect("http://localhost:3000/login?error=" + urllib.parse.quote("No linked Facebook pages found or missing permissions. Make sure your account is an Admin of a Facebook Page."))

        # Iterate pages to find IG Business Accounts
        ig_account_id = None
        for page in me_data["data"]:
            page_id = page["id"]
            page_token = page["access_token"]
            ig_url = f"https://graph.facebook.com/v19.0/{page_id}?fields=instagram_business_account&access_token={page_token}"
            ig_res = requests.get(ig_url)
            ig_data = ig_res.json()
            if "instagram_business_account" in ig_data:
                ig_account_id = ig_data["instagram_business_account"]["id"]
                break
        
        if not ig_account_id:
            return redirect("http://localhost:3000/login?error=" + urllib.parse.quote("No Instagram Business account is linked to your Facebook Pages. Please link them in Facebook Settings."))

        # 3. Create or update profile
        user, created = User.objects.get_or_create(username=f"ig_{ig_account_id}")
        profile, p_created = InstagramProfile.objects.update_or_create(
            user=user,
            defaults={
                "instagram_user_id": ig_account_id,
                "access_token": access_token, 
                "username": user.username
            }
        )

        login(request, user)
        return redirect("http://localhost:3000/dashboard")

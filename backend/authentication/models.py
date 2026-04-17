from django.db import models
from django.contrib.auth.models import User

class InstagramProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='instagram_profile')
    instagram_user_id = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    access_token = models.TextField()
    profile_picture_url = models.URLField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

from django.db import models
from authentication.models import InstagramProfile

class Reel(models.Model):
    profile = models.ForeignKey(InstagramProfile, on_delete=models.CASCADE, related_name='reels')
    media_id = models.CharField(max_length=255, unique=True)
    media_url = models.URLField(max_length=1000)
    permalink = models.URLField(max_length=1000)
    media_type = models.CharField(max_length=50) # Should be VIDEO
    caption = models.TextField(null=True, blank=True)
    like_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    timestamp = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reel {self.media_id} by {self.profile.username}"

class Comment(models.Model):
    reel = models.ForeignKey(Reel, on_delete=models.CASCADE, related_name='comments')
    comment_id = models.CharField(max_length=255, unique=True)
    text = models.TextField()
    timestamp = models.DateTimeField()
    like_count = models.IntegerField(default=0)

    def __str__(self):
        return f"Comment {self.comment_id} on Reel {self.reel.media_id}"

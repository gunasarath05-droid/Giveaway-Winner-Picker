from django.urls import path
from .views import InstagramLoginView, InstagramCallbackView

urlpatterns = [
    path('instagram/login/', InstagramLoginView.as_view(), name='instagram_login'),
    path('instagram/callback/', InstagramCallbackView.as_view(), name='instagram_callback'),
]

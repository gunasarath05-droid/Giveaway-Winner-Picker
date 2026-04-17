from django.urls import path
from .views import ReelAnalysisView

urlpatterns = [
    path('<str:media_id>/', ReelAnalysisView.as_view(), name='reel_analysis'),
]

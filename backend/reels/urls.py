from django.urls import path
from .views import ReelsListView, ReelCommentsView, DashboardStatsView

urlpatterns = [
    path('', ReelsListView.as_view(), name='reels_list'),
    path('stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
    path('comments/<str:media_id>/', ReelCommentsView.as_view(), name='reel_comments'),
]

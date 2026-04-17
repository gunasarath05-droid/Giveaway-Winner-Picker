from django.urls import path
from .views import PickCommentView, webhook

urlpatterns = [
    path('pick-comment/', PickCommentView.as_view(), name='pick-comment'),
    path('webhook/', webhook, name='webhook'),
]

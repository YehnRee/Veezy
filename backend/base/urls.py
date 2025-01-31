from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('videos/', views.getVideos, name="videos"),
    path('videos/<str:pk>/', views.getVideo, name="video"),
]
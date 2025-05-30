from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('videos/', views.getVideos, name="videos"),
    path('videos/myvideos/', views.getMyVideos, name='my-videos'),
    path('videos/upload/', views.uploadVideo, name="upload-video"),
    path('videos/<str:pk>/', views.getVideo, name="video"),
    path('videos/<str:pk>/update/', views.updateVideo, name="update-video"),
    path('videos/<str:pk>/delete/', views.deleteVideo, name="delete-video"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name="user-profile"),
    path('users/profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('users/', views.getUsers, name="users"),
    path('users/register/', views.registerUser, name='register'),
]
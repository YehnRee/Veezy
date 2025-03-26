from django.shortcuts import render
from base.videos import videos
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/videos/',
        '/videos/create/',

        '/videos/upload/',

        '/videos/<id>/reviews/',

        '/videos/top/',
        '/videos/<id>/',

        '/videos/delete/<id>/',
        '/videos/<update>/<id>/',

    ]
    return Response(routes)

@api_view(['GET'])
def getVideos(request):
    videos = Video.objects.all()
    serializers = VideoSerializer(videos, many=True, context={'request': request})  # ✅ Pass request context
    return Response(serializers.data)

@api_view(['GET'])
def getVideo(request, pk):
    video = Video.objects.get(_id=pk)
    serializer = VideoSerializer(video, many=False, context={'request': request})  # ✅ Pass request context
    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

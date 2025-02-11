from django.shortcuts import render
from base.videos import videos
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *

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
    from .serializers import VideoSerializer
    videos = Video.objects.all()
    serializers = VideoSerializer(videos, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getVideo(request, pk):
    from .serializers import VideoSerializer
    video = Video.objects.get(_id=pk)
    serializer = VideoSerializer(video, many=False)
    return Response(serializer.data)

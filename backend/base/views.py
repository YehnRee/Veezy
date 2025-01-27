from django.shortcuts import render
from django.http import JsonResponse
from base.videos import videos
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
    from base.videos import videos
    return Response(videos)

@api_view(['GET'])
def getVideo(request, pk):
    video = None
    for i in videos:
        if i['_id'] == pk:
            video = i
            break
    return Response(video)
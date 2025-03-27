from django.shortcuts import render
from base.videos import videos
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import *
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyVideos(request):
    user = request.user
    videos = Video.objects.filter(user=user)  # Fetch only the logged-in user's videos
    serializer = VideoSerializer(videos, many=True, context={'request': request})
    return Response(serializer.data)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['name'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data

    user.first_name = data.get('name', user.first_name)
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)

    if data.get('password'):
        user.password = make_password(data['password'])

    if 'isAdmin' in data:
        user.is_staff = data['isAdmin']  # Allow updating admin status

    user.save()
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadVideo(request):
    user = request.user
    data = request.data

    video = Video.objects.create(
        user=user,
        name=data['name'],
        description=data.get('description', ''),
        vid=request.FILES.get('vid'),
        image=request.FILES.get('image', None),
    )

    serializer = VideoSerializer(video, context={'request': request})
    return Response(serializer.data, status=201)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateVideo(request, pk):
    video = get_object_or_404(Video, _id=pk)

    # Ensure only the owner can update
    if video.user != request.user:
        return Response({'detail': 'Not authorized to update this video'}, status=403)

    data = request.data
    video.name = data['name']
    video.description = data['description']
    video.save()

    return Response(VideoSerializer(video).data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteVideo(request, pk):
    video = get_object_or_404(Video, _id=pk)

    # Ensure only the owner can delete
    if video.user != request.user:
        return Response({'detail': 'Not authorized to delete this video'}, status=403)

    video.delete()
    return Response({'detail': 'Video deleted successfully'})
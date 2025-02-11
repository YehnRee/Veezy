from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
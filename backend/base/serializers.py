from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    vid = serializers.SerializerMethodField()

    def get_vid(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.vid.url) if obj.vid else None
    class Meta:
        model = Video
        fields = '__all__'
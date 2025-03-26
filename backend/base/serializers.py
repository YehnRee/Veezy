from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class VideoSerializer(serializers.ModelSerializer):
    vid = serializers.SerializerMethodField()
    user = serializers.StringRelatedField()
    image = serializers.SerializerMethodField()

    def get_vid(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.vid.url) if obj.vid else None
    
    def get_image(self, obj):  # Define this method
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if obj.image else None
    
    class Meta:
        model = Video
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for [k, v] in serializer.items():
            data[k] = v

        print("Login Response Data:", data)  # Debugging line
        return data

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'name', 'isAdmin', 'username', 'email']

    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
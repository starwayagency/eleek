from rest_framework import serializers
from ..models import * 
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserGoogleSerializer(serializers.Serializer):
    sub = serializers.CharField()
    name = serializers.CharField()
    given_name = serializers.CharField()
    family_name = serializers.CharField()
    picture = serializers.URLField()
    email = serializers.EmailField()
    email_verified = serializers.BooleanField()
    locale = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
        )
        return user


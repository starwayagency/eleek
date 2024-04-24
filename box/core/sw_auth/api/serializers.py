from rest_framework import serializers 
from django.contrib.auth import get_user_model 
from django.contrib.auth.models import Group, Permission 







class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        exclude = [
        ]



class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        exclude = [
        ]



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = [
            'password',
            'phone_number',
            'birth_date',
            'gender',
            'first_name',
            'last_name',
            'email',
            'username',
        ]



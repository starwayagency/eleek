from rest_framework import serializers 
from .models import * 

base_exclude = ['created','updated','is_active',]

# # # # # # # # # # # # 

class FrameColorSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FrameColor; 
        exclude = base_exclude;  


class FrameTypeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FrameType; 
        exclude = base_exclude;


class Tab(serializers.ModelSerializer):
    class Meta: 
        model = Tab; 
        exclude = base_exclude; 


class TabGroupSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TabGroup; 
        exclude = base_exclude; 


class ParameterSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Parameter; 
        exclude = base_exclude; 


class ValueSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Value; 
        exclude = base_exclude; 

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Relationship; 
        exclude = base_exclude; 

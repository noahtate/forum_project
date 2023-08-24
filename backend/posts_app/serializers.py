# pokemon_app/serializers.py
from rest_framework import serializers # import serializers from DRF
from .models import Post # import Pokemon model from models.py
from users_app.models import User

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post # specify what model this serializer is for
        fields = ['id', 'title','content','created_by','topic_id','edited','date_created'] # specify the fields you would like this serializer to return

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post # specify what model this serializer is for
        fields = ['id', 'title','content','created_by','topic_id','edited','date_created','title'] # specify the fields you would like this serializer to return

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User # specify what model this serializer is for
        fields = ['id', 'profile_picture','display_name'] # specify the fields you would like this serializer to return

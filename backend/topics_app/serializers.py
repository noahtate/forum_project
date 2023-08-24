# pokemon_app/serializers.py
from rest_framework import serializers # import serializers from DRF
from .models import Topic # import Pokemon model from models.py

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic # specify what model this serializer is for
        fields = ['id', 'title'] # specify the fields you would like this serializer to return

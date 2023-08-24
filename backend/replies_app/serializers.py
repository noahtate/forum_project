# pokemon_app/serializers.py
from rest_framework import serializers # import serializers from DRF
from .models import Reply # import Pokemon model from models.py

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply # specify what model this serializer is for
        fields = ['id', 'content','created_by','post_id','edited'] # specify the fields you would like this serializer to return

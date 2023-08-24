# pokemon_app/serializers.py
from rest_framework import serializers # import serializers from DRF
from .models import User # import Pokemon model from models.py
from topics_app.models import Topic

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic # specify what model this serializer is for
        fields = ['id', 'title'] # specify the fields you would like this serializer to return

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','display_name','profile_picture','date_joined','bio','is_active','last_login',]

class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','display_name','profile_picture']


# bio:"demondemonmdoenodeodmoendoned"
# date_joined:"2023-08-22T00:23:16Z"
# display_name:"demon"
# is_active:true
# is_staff:true
# last_login:"2023-08-22T00:23:43Z"
# last_name:"mon"
# profile_picture:"https://api.multiavatar.com/ice.png"
# username:"demon"
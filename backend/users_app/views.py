from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, Response
from django.core.serializers import serialize
import json
from rest_framework import status
from .models import User
import requests # <== import requests so we can utilize it within our CBV to make API calls
from requests_oauthlib import OAuth1 #<== import OAuth1 which will essentially authenticate our keys when we send a request
import os
from .serializers import UserSerializer, UserPublicSerializer   


api_key = os.environ.get('MULTIAVATAR_API_KEY')
def pfp(username):
    print("api key:","MPUZLtAEjFaBN0e")
    url = "https://api.multiavatar.com/" + username
    params = {
        "api_key": "MPUZLtAEjFaBN0e"
    }
    # https://api.multiavatar.com/dummy_user_1?api_key=MPUZLtAEjFaBN0e example query
    print("URL: ",url)
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        print(data)
        return data
    else:
        print("Request failed:", response.status_code)

class User_Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self,request,user_id=None):
        if user_id==None:
            authorization_header = request.META.get('HTTP_AUTHORIZATION')
            if authorization_header:
                token = authorization_header.split()[1]
                user_id_from_token = Token.objects.get(key=token).user_id
                user = User.objects.get(id=user_id_from_token)
                serialized_user = UserSerializer(user).data
                return Response(serialized_user, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Authorization header not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                user = User.objects.get(id=user_id)
                serialized_user = UserSerializer(user).data
                return Response(serialized_user,status=status.HTTP_200_OK)
            except User.DoesNotExist:
                error_message = {"error": "User not found"}
                return Response(error_message, status=status.HTTP_404_NOT_FOUND)
        
class User_Public_Info(APIView):
    
    def get(self,request,user_id):
        try:
            user = User.objects.get(id=user_id)
            serialized_user = UserPublicSerializer(user).data
            return Response(serialized_user,status=status.HTTP_200_OK)
        except User.DoesNotExist:
            error_message = {"error": "User not found"}
            return Response(error_message, status=status.HTTP_404_NOT_FOUND)

class Sign_Up(APIView):
    def post(self, request):
        request.data["profile_picture"] = pfp(request.data["display_name"])
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {"user": user.email, "token": token.key}, status=HTTP_201_CREATED
        )


class Log_In(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email, "display_name":user.display_name, "user_id":user.id})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)


class Log_Out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

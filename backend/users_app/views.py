from django.shortcuts import render
from rest_framework.views import APIView, Response
from django.core.serializers import serialize
import json
from rest_framework import status
from .models import User

# Create your views here.
class A_User(APIView):
    def get(self,request,user_id):
        try:
            print('''
            TRYING TO GET USER...
            ''')
            print(User.objects.all())
            user = User.objects.get(id=user_id)
            print('''
            USER OBTAINED...
            ''')
            serialized_user = serialize("json",[user])
            pretty_user = json.loads(serialized_user)
            print(pretty_user)
            # Do something with the retrieved user
            print(f"User found: {user}")
            return Response(pretty_user,status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            error_message = {"error": "User not found"}
            return Response(error_message, status=status.HTTP_404_NOT_FOUND)


    def post(self,request):
        pass
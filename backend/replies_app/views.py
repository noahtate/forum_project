from django.shortcuts import render
from .models import Reply
from django.http import JsonResponse
# Create your views here.
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, Response
from django.core.serializers import serialize
from rest_framework import status
from users_app.models import User
import json, time

class Post_Edit(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            json_data = json.loads(request.body.decode("utf-8"))
            content = json_data.get("content")
            user_id = json_data.get("user")
            post_id = json_data.get("post_id")
            
            user = User.objects.get(id=user_id)
            
            new_reply = Reply(content=content, created_by=user, post_id_id=post_id)
            new_reply.save()
            
            return JsonResponse({"new_reply": new_reply.id}, status=201)  # Return the newly created reply ID
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    # id = models.BigAutoField(primary_key=True)
    # content = models.TextField()
    # created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies_created')
    # post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    # edited = models.BooleanField(default=False)
    # date_created = models.DateField(auto_now_add=True)


# permissions.py

from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the request user is the owner of the object
        print("obj.user",obj.user,"request.user",request.user)
        return obj.user == request.user

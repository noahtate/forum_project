from django.db import models
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    # user_name = models.CharField()
    profile_picture = models.CharField()
    bio = models.TextField()
    # posts = models.ManyToOneRel ... (can't expicitly call this because it will be determined in the posts class, right?)
    # replies = ... same as above i believe.

    def __str__(self):
        return self.username

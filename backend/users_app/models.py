from django.db import models
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)

    def __str__(self):
        return self.username

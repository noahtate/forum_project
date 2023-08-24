from django.db import models
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        # Create and save a user with the given email and password
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        # Create and save a superuser with the given email and password
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user( email, password, **extra_fields)


class User(AbstractUser):
    objects = CustomUserManager()
    id = models.BigAutoField(primary_key=True)
    profile_picture = models.CharField(max_length=255,)
    bio = models.TextField()
    display_name = models.CharField(max_length=255,unique=True )
    date_created = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] 



    def __str__(self):
        return f"{self.email}"


# INSERT INTO users_app_user (password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, id, bio, profile_picture, display_name)
# VALUES ('hashed_password', null, false, 'newuser', 'John', 'Doe', 'john.doe@example.com', false, true, NOW(), 1, 'User bio', 'profile.jpg', 'JohnD');

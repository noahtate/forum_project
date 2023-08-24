from django.contrib import admin

# Register your models here.

# Register your models here.
from django.contrib import admin
from .models import User

@admin.register(User)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('username','id','email','is_staff','is_superuser')  # Customize fields displayed in the list view
    search_fields = ('username','id','email','is_staff','is_superuser')  # Add search functionality
from django.contrib import admin

# Register your models here.

# Register your models here.
from django.contrib import admin
from .models import Topic

@admin.register(Topic)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('title','id')  # Customize fields displayed in the list view
    search_fields = ('title',)  # Add search functionality
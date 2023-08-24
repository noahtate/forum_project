
# Register your models here.
from django.contrib import admin
from .models import Post

@admin.register(Post)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by','id','topic_id')  # Customize fields displayed in the list view
    search_fields = ('title','id')  # Add search functionality
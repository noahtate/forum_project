from django.contrib import admin

# Register your models here.

# Register your models here.
from django.contrib import admin
from .models import Reply

@admin.register(Reply)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('created_by','id','post_id')  # Customize fields displayed in the list view
    search_fields = ('id',)  # Add search functionality
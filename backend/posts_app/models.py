from django.db import models
from topics_app.models import Topic
from users_app.models import User


class Post(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts_created')
    topic_id = models.ForeignKey(Topic, on_delete=models.CASCADE)
    edited = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)

    def __str__(self):
        return f"Post {self.content} by {self.created_by.username} in {self.topic_id.title}"
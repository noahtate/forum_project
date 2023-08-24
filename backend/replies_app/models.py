from django.db import models
from users_app.models import User
from posts_app.models import Post
class Reply(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies_created')
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    edited = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply by {self.created_by.username} to Post {self.post_id}. Content: {self.content}"

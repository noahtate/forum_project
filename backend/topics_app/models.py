from django.db import models

class Topic(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)

    def __str__(self):
        return f"Title:{self.title}, ID:{self.id} | "
    
    def json(self):
        return {"Title":self.title, "ID":self.id}
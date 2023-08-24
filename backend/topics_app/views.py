from django.http import JsonResponse, HttpResponse
from django.core.paginator import Paginator
from posts_app.models import Post
from .models import Topic
from replies_app.models import Reply
from django.db.models import Count, Subquery, OuterRef
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, Response
import json
from users_app.models import User


class Post_Edit(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, topic_id):
        try:
            json_data = json.loads(request.body.decode("utf-8"))
            content = json_data.get("content")
            title = json_data.get("title")
            user_id = json_data.get("user")
            topic_id = json_data.get("topic_id")
            
            user = User.objects.get(id=user_id)
            
            new_post = Post(content=content, created_by=user, topic_id_id=topic_id, title=title)
            new_post.save()
            
            return JsonResponse({"new_post": new_post.id, "title":new_post.title}, status=201)  # Return the newly created reply ID
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

def homepage_view(request):
    topics = Topic.objects.annotate(
        num_posts=Count('post'),
        most_recent=Subquery(
            Post.objects.filter(topic_id=OuterRef('pk')).order_by('-date_created').values('date_created')[:1]
        )
    ).order_by("id")[:5]

    topics_data = [
        {
            "id": topic.id,
            "title": topic.title,
            "num_posts": topic.num_posts,
            "most_recent": topic.most_recent
        }
        for topic in topics
    ]
    
    return JsonResponse(topics_data, safe=False)


def paginated_view(request, topic_id):
    # Annotate each post with num_replies and most_recent fields
    posts = Post.objects.annotate(
        num_replies=Count('reply'),
        most_recent=Subquery(
            Reply.objects.filter(post_id=OuterRef('pk')).order_by('-date_created').values('date_created')[:1]
        )
    ).filter(topic_id=topic_id).order_by("id")

    title = Topic.objects.get(id=topic_id).title

    items_per_page = 3
    paginator = Paginator(posts, items_per_page)

    page_number = request.GET.get('page')  # Get the requested page number from the URL
    page = paginator.get_page(page_number)

    # Construct the paginated data including num_replies and other fields
    paginated_data = [
        {
            "post_id": post.id,
            "content": post.content,
            "created_by": post.created_by.username,
            "date_created": post.date_created,
            "title": post.title,
            "topic_id": topic_id,
            "topic_title":title,
            'num_replies': post.num_replies,
        }
        for post in page.object_list
    ]

    return JsonResponse({'page': page.number, 'total_pages': paginator.num_pages, 'data': paginated_data})

from django.http import JsonResponse
from django.core.paginator import Paginator
from .models import Post
from replies_app.models import Reply
from users_app.models import User
from .serializers import PostSerializer, UserSerializer
from django.db.models import Count, Subquery, OuterRef

def paginated_view(request, post_id, topic_id):
    selected_post = Post.objects.get(id=post_id)
    serialized_post = PostSerializer(selected_post).data
    
    filtered_replies = Reply.objects.filter(post_id=post_id).order_by("id")
    
    # posted_by = User.objects.get(id=selected_post.created_by.id)
    # serialized_user = UserSerializer(posted_by).data
    
    items_per_page = 5
    paginator = Paginator(filtered_replies, items_per_page)

    page_number = request.GET.get('page')  # Get the requested page number from the URL
    page = paginator.get_page(page_number)

    # Convert the paginated data to a list of dictionaries
    paginated_data = [
        {
            'id': reply.id,
            'created_by':reply.created_by.display_name,
            'created_by_id':reply.created_by.id,
            'date_created':reply.date_created,
            'profile_picture':reply.created_by.profile_picture,
            'content': reply.content,
            # Add more fields as needed
        }
        for reply in page.object_list
    ]
#  "user":serialized_user,
    response = JsonResponse({'page': page.number, 'total_pages': paginator.num_pages, "post":serialized_post, 'data': paginated_data})
    response["Access-Control-Allow-Origin"] = "*"  # Add this line to set the CORS header
    return response








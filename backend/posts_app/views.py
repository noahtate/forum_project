from django.http import JsonResponse
from django.core.paginator import Paginator
from posts_app.models import Post

def paginated_view(request, post_id,topic_id):
    filtered_posts = Post.objects.filter(topic_id=topic_id)
    items_per_page = 2
    paginator = Paginator(filtered_posts, items_per_page)

    page_number = request.GET.get('page')  # Get the requested page number from the URL
    page = paginator.get_page(page_number)

    # Convert the paginated data to a list of dictionaries
    paginated_data = [
        {
            'id': post.id,
            'content': post.content,
            # Add more fields as needed
        }
        for post in page.object_list
    ]

    return JsonResponse({'page': page.number, 'total_pages': paginator.num_pages, 'data': paginated_data})

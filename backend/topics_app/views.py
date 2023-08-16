from django.http import JsonResponse, HttpResponse
from django.core.paginator import Paginator
from posts_app.models import Post
from .models import Topic

def topics_view(request):
    topics = Topic.objects.all().order_by("id")
    for i in topics:
        print(i.id,i.title)
        print(i.json())
    return HttpResponse(topics)

def paginated_view(request, topic_id):
    filtered_posts = Post.objects.filter(topic_id=topic_id).order_by("id")
    for i in filtered_posts:
        print(i)
    items_per_page = 1
    paginator = Paginator(filtered_posts, items_per_page)

    page_number = request.GET.get('page')  # Get the requested page number from the URL
    page = paginator.get_page(page_number)

    # Convert the paginated data to a list of dictionaries
    paginated_data = [
        {
            "id": post.id,
            "content": post.content,
            "created_by": post.created_by.username,
            "date_created": post.date_created,
            "title": post.title
        }
        for post in page.object_list
    ]

    return JsonResponse({'page': page.number, 'total_pages': paginator.num_pages, 'data': paginated_data})

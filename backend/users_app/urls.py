"""
URL configuration for school_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import User_Info,Sign_Up,Log_In,Log_Out,User_Public_Info,User_Bio

urlpatterns = [
    path("user/signup/",Sign_Up.as_view(),name="signup"),
    path("user/login/",Log_In.as_view(),name="login"),
    path("user/logout/",Log_Out.as_view(),name="logout"),
    path("user/<int:user_id>/",User_Info.as_view(), name="A_User"),
    path("user/token/",User_Info.as_view(), name="token"),
    path("user/<int:user_id>/public/",User_Public_Info.as_view(), name="A_User_Public"),
    path("user/bio/",User_Bio.as_view(), name="bio"),
]






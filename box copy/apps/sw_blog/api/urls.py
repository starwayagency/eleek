from django.urls import path 
from ...views import *


urlpatterns = [
    path('get_posts/', get_posts, name="get_posts"),
    path('search_posts/', search_posts, name="search_posts"),
]

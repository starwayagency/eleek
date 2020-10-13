from django.urls import path, include 

from .views import * 
urlpatterns = [
    path('get_info/', get_info),
    path('get_price/', get_price),
    path('make_eleek_order/', make_eleek_order),
]

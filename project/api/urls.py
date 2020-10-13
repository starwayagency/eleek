from django.urls import path, include 
from .views import * 
from rest_framework.routers import DefaultRouter



router = DefaultRouter
# router.register('/', ViewSet)



urlpatterns = [
    # path('', include(router.urls)),
    path('test_drive_contact/', test_drive_contact, name='test_drive_contact'),
    path('update_project_user/', update_project_user, name='update_project_user'),
]






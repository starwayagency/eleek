
from django.urls import path, include 
from .views import * 

urlpatterns = [
  path("liqpay/pay_callback/", pay_callback, name='pay_callback'),
  path('test_part/', test_part, name='test_part'),
]



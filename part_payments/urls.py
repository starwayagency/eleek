from django.urls import path, include
from . import views

urlpatterns = [
    path('payment/installments/', views.payment_installments, name='payment_installments'),
    path('payment/installments/callback/', views.payment_callback, name='payment_callback'),
    path('payment/installments/redirect/', views.payment_redirect, name='payment_redirect'),
]

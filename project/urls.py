from django.urls import path, include 
from django.shortcuts import redirect

from project.views import google_authorization, google_callback


def set_currency(request, currency):
    url = request.META.get('HTTP_REFERER', '/')
    print(url, currency)
    request.session['current_currency_code'] = currency
    return redirect(url)
    


urlpatterns = [
    path('api/', include('project.api.urls')),
    # path('api/dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('api/dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('set_currency/<currency>/', set_currency, name='set_currency'),
    path('google_authorization/', google_authorization, name='google_authorization'),
    path('google_callback/', google_callback, name='google_callback'),
]
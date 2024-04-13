import requests

from urllib.parse import urljoin

from decouple import config
from django.http import HttpResponseRedirect
from .api.serializers import UserGoogleSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import login


DOMAIN = config('DOMAIN', default="fsd")
GOOGLE_CLIENT_ID = config('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = config('GOOGLE_CLIENT_SECRET')

def google_authorization(request):
    client_id = GOOGLE_CLIENT_ID
    scope = ' '.join([
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ])
    redirect_uri = str(urljoin(DOMAIN, '/google_callback/'))

    authorization_params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'scope': scope,
        'response_type': 'code',
        'access_type': 'offline',
        'prompt': 'select_account',
    }
    authorization_url = (
            "https://accounts.google.com/o/oauth2/auth?"
            + "&".join(f"{key}={value}" for key, value in authorization_params.items())
    )

    return HttpResponseRedirect(authorization_url)


def get_google_access_token(code: str) -> str:
    token_url = 'https://oauth2.googleapis.com/token'

    redirect_uri = str(urljoin(DOMAIN, '/google_callback/'))
    data = {
        'code': code,
        'client_id': f"{GOOGLE_CLIENT_ID}",
        'client_secret': f"{GOOGLE_CLIENT_SECRET}",
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    response = requests.post(token_url, data=data)
    access_token = response.json()['access_token']

    return access_token


def register_user_from_oauth(request, user_data):
    # Реєстрація користувача по даних від гугла
    serializer = UserGoogleSerializer(data=user_data)
    if serializer.is_valid():
        user = serializer.save()
        # print("Зареєстровано")
        # Авторизуємо користувача
        if user is not None:
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            # print("Залогінено")
        return HttpResponseRedirect(f"{DOMAIN}")  
      


def google_callback(request):
    code = request.GET.get('code')
    
    if not code:
        return HttpResponseRedirect(f"{DOMAIN}")

    access_token = get_google_access_token(code=code)

    response = requests.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        params={'access_token': access_token}
    )

    if not response.ok:
        return HttpResponseRedirect(f"{DOMAIN}")

    user_data = response.json()
    email = user_data.get('email')

    # Перевірка чи існує такий юзер
    User = get_user_model()
    if User.objects.filter(email=email).exists():
        user = User.objects.get(email=email)
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return HttpResponseRedirect(f"{DOMAIN}")
    else:
        register_user_from_oauth(request, user_data)
        return HttpResponseRedirect(f"{DOMAIN}")
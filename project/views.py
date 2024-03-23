import requests

from django.http import HttpResponseRedirect, JsonResponse


def google_authorization(request):
    client_id = ""
    scope = ' '.join([
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ])
    redirect_uri = "http://127.0.0.1:8000/google_callback/"

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

    redirect_uri =  "http://127.0.0.1:8000/google_callback/"
    data = {
        'code': code,
        'client_id': "",
        'client_secret': "",
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    response = requests.post(token_url, data=data)
    access_token = response.json()['access_token']

    return access_token


def google_callback(request):
    code = request.GET.get('code')
    if not code:
        return HttpResponseRedirect("http://127.0.0.1:8000/")

    access_token = get_google_access_token(code=code)

    response = requests.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        params={'access_token': access_token}
    )

    if not response.ok:
        return HttpResponseRedirect("http://127.0.0.1:8000/")

    # todo create user here or authenticate when exists

    return JsonResponse(response.json(), safe=False)
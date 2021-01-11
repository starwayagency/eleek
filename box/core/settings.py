from django.conf import settings 


def get(x, y): return getattr(settings, x, y)


IMAGE_NOT_FOUND                = get(
    'IMAGE_NOT_FOUND', '/static/core/img/photo_not_found.jpg')
SHOW_ADMIN                     = get(
    'SHOW_ADMIN', False)
PREFIX_DEFAULT_LANGUAGE        = get(
    'PREFIX_DEFAULT_LANGUAGE', True)
STATIC_SITEMAP_PAGES           = get(
    'STATIC_SITEMAP_PAGES', [])
PROJECT_CORE_MULTILINGUAL_URLS = get(
    'PROJECT_CORE_MULTILINGUAL_URLS', [])
PROJECT_CORE_URLS              = get(
    'PROJECT_CORE_URLS', [])

DJANGO_DEBUG_TOOLBAR_ON = get(
    'DJANGO_DEBUG_TOOLBAR_ON', False)

CAPTCHA_V2_PUBLIC = 'SDF'
CAPTCHA_V2_SECRET = 'SDF'
CAPTCHA_V3_PUBLIC = 'SDF'
CAPTCHA_V3_SECRET = 'SDF'

PATH_400    = get('PATH_400', 'core/errors/400.html')
PATH_403    = get('PATH_403', 'core/errors/403.html')
PATH_404    = get('PATH_404', 'core/errors/404.html')
PATH_500    = get('PATH_500', 'core/errors/500.html')

HANDLER_400 = get('HANDLER_400', 'box.core.views.custom_bad_request')
HANDLER_403 = get('HANDLER_403', 'box.core.views.custom_permission_denied')
HANDLER_404 = get('HANDLER_404', 'box.core.views.custom_page_not_found')
HANDLER_500 = get('HANDLER_500', 'box.core.views.custom_server_error')

URL_400 = get('URL_400', "test_400/")
URL_403 = get('URL_403', "test_403/")
URL_404 = get('URL_404', "test_404/")
URL_500 = get('URL_500', "test_500/")


DEFAULT_RECIPIENT_LIST = get('DEFAULT_RECIPIENT_LIST', [])



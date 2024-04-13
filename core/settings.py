from box.core.default_settings import * 

INSTALLED_APPS +=[
    'project',
    'nova_poshta',
    'part_payments',
]


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'




DEBUG = True





TEMPLATES[0]['OPTIONS']['context_processors'].extend([
    'project.context_processors.context',
])
DJANGO_DEBUG_TOOLBAR_ON = False 
MIDDLEWARE.extend([
    # 'project.middlewares.Middleware',
    'allauth.account.middleware.AccountMiddleware',
])
AUTH_USER_MODEL = 'project.ProjectUser'
STATIC_SITEMAP_PAGES = [
    # 'index',
    # 'contact',
    # 'blog',
    # 'about',
]
PROJECT_CORE_MULTILINGUAL_URLS = [
    'project.multilingual_urls',
]
PROJECT_CORE_URLS = [
    'project.urls',
]
ROOT_URLCONF     = 'box.core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}



LIQPAY_PUBLIC_KEY = 'i46942964050'
LIQPAY_PRIVATE_KEY = 'e0EMc79BGqm2oieTc4ujvq2iv7NPjNu7MmSlEAoM'
LIQPAY_SANDBOX_PUBLIC_KEY = 'sandbox_i36382218041'
LIQPAY_SANDBOX_PRIVATE_KEY = 'sandbox_XcBJpBTSMHJqN9Ms1mYtYEd7Ha7oW9LlDz8YZQcr'

LIQPAY_SANDBOX_MODE = True 


LOGIN_REDIRECT_URL = 'profile'
LOGIN_URL = 'login'


from decouple import AutoConfig
config = AutoConfig(search_path=str(BASE_DIR))

SECRET_KEY         = config('SECRET_KEY') # = ast.literal_eval(config('DEBUG') or "True")  #python manage.py runserver --insecure # for 404 page
DEBUG              = config('DEBUG', cast=bool) # = ast.literal_eval(config('DEBUG') or "True")  #python manage.py runserver --insecure # for 404 page
# EMAIL_BACKEND          = 'box.core.sw_global_config.backends.ConfiguredEmailBackend'
# EMAIL_USE_TLS          = True
# EMAIL_USE_SSL          = False
# EMAIL_PORT             = 587
# EMAIL_HOST             = "mail.starwayua.com"
# EMAIL_HOST_USER        = "dev@starwayua.com"
# EMAIL_HOST_PASSWORD    = 'dev69018'#config('EMAIL_HOST_PASSWORD')
# DEFAULT_FROM_EMAIL     = EMAIL_HOST_USER
EMAIL_BACKEND          = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS          = True
EMAIL_USE_SSL          = False
EMAIL_PORT             = 587
EMAIL_HOST             = "smtp.gmail.com"
SERVER_EMAIL           = 'starway.notifier@gmail.com'
EMAIL_HOST_USER        = "starway.notifier@gmail.com"
EMAIL_HOST_PASSWORD    = "ipbqvhxkublskmkp"
DEFAULT_FROM_EMAIL     = EMAIL_HOST_USER
ADMINS = [
    "starway.notifier@gmail.com"
]
MANAGERS = ADMINS


DEFAULT_RECIPIENT_LIST = [
    # "jurgeon018@gmail.com",
    # "kleikoks.py@gmail.com",
    # "dev@starwayua.com",
    # 'eleekbikes@gmail.com',
]

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_USE_TLS = True
# EMAIL_PORT = 587
# EMAIL_HOST_USER = 'jurgeon018@gmail.com'
# EMAIL_HOST_PASSWORD = 'yfpfhrj69001'


FILTER_BY_CATEGORY = False 
FILTER_BY_SUBCATEGORIES = True

DATA_UPLOAD_MAX_MEMORY_SIZE = 56214400
DATA_UPLOAD_MAX_NUMBER_FIELDS = 56214400

PATH_400    = 'page_400.html'
PATH_403    = 'page_403.html'
PATH_404    = 'page_404.html'
PATH_500    = 'page_500.html'
# ACCOUNT_UNIQUE_EMAIL = True
# ACCOUNT_UNIQUE_EMAIL = False 


# SERVER_EMAIL = 'dev@starwayua.com'
# ADMINS = [
#     ('jurgeon018', 'jurgeon018@gmail.com'),
#     ('DEV', 'dev@starwayua.com'),
# ]
# MANAGERS = ADMINS 


import re 
IGNORABLE_404_URLS = [
    re.compile(r'\.(php|cgi)$'),
    re.compile(r'^/phpmyadmin/'),
    re.compile(r'^/wp-content/*'),
    re.compile(r'^/product/*'),
    re.compile(r'^/product-category/*'),
    re.compile(r'^/set_lang/*'),
    re.compile(r'^/favicon.ico'),
    re.compile(r'^/magazyn/'),
    re.compile(r'^/contacts/'),
    re.compile(r'^/wp-admin/'),
    re.compile(r'^/wp-content/*'),
    re.compile(r'^/wp-content/'),
    re.compile(r'^/asset-manifest.json'),
    re.compile(r'\.(php|cgi)$'),
    re.compile(r'^/phpmyadmin/'),
    re.compile(r'^/wp-content/*'),
    re.compile(r'^/set_lang/*'),
    re.compile(r'^/favicon.ico'),
    re.compile(r'^/asset-manifest.json'),
    re.compile(r'^/wp-content/*'),
    re.compile(r'^/wp-content/'),
    re.compile(r'^/wp-admin/'),
    re.compile(r'^/wordpress/wp-admin/'),
    re.compile(r'^/android-icon-192x192.png'),
    re.compile(r'^/components/com_acym/index.html'),
]

DEBUG=True
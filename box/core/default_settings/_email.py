from decouple import config 
import re 
IGNORABLE_404_URLS = [
    re.compile(r'\.(php|cgi)$'),
    re.compile(r'^/phpmyadmin/'),
    re.compile(r'^/wp-content/*'),
]
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS          = True
EMAIL_USE_SSL          = False
EMAIL_PORT             = 587
EMAIL_HOST             = "mail.starwayua.com"
EMAIL_HOST_USER        = "dev@starwayua.com"
DEFAULT_FROM_EMAIL     = EMAIL_HOST_USER

SERVER_EMAIL = 'dev@starwayua.com'
ADMINS = [
    # ('jurgeon018', 'jurgeon018@gmail.com'),
    ('DEV', 'dev@starwayua.com'),
]
MANAGERS = ADMINS 

















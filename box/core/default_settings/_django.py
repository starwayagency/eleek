import os
import ast
from pathlib import Path


INTERNAL_IPS = [
    '127.0.0.1',
]
ROOT_URLCONF       = 'box.core.urls'
WSGI_APPLICATION   = 'box.core.wsgi.application'
BASE_DIR           = Path(__file__).resolve().parent.parent.parent.parent
ALLOWED_HOSTS      = ['*']

STATICFILES_DIRS   = (os.path.join(BASE_DIR, "static"),)
STATIC_ROOT        = os.path.join(BASE_DIR, "static_root")
MEDIA_ROOT         = os.path.join(BASE_DIR, "media")
STATIC_URL         = '/static/'
MEDIA_URL          = '/media/'
SITE_ID            = 1
# https://stackoverflow.com/questions/47585583/the-number-of-get-post-parameters-exceeded-settings-data-upload-max-number-field
# DATA_UPLOAD_MAX_NUMBER_FIELDS = 10240 









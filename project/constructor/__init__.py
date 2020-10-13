from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ConstructorConfig(AppConfig):
    name = 'project.constructor'
    verbose_name = _("Конструктор")
    verbose_name_plural = verbose_name

default_app_config = 'project.constructor.ConstructorConfig'

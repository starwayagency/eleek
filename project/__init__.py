

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ProjectConfig(AppConfig):
    name = 'project'
    verbose_name = _("ELEEK")
    verbose_name_plural = verbose_name

default_app_config = 'project.ProjectConfig'

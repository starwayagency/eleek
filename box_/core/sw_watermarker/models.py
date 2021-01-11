from django.db import models
from django.utils.translation import ugettext_lazy as _




class Watermark(models.Model):

    name         = models.CharField(max_length=50, verbose_name=_("name"))
    image        = models.ImageField(upload_to='watermarks', verbose_name=_("image"))
    is_active    = models.BooleanField(default=True, blank=True, verbose_name=_("is active"))
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name = _("watermark")
        verbose_name_plural = _("watermarks")

    def __str__(self):
        return self.name

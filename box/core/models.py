from django.db import models 
from django.utils.translation import gettext_lazy as _
from django.utils import timezone 
from box.core import settings as core_settings 

from tinymce import HTMLField

from .managers import BasicManager, ActiveManager
from django.db.models.manager import BaseManager
from box.core.helpers import get_admin_url
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os

# from django.shortcuts import reverse 

__all__ = [
    "BaseMixin",
    "AbstractPage",
]

class BaseMixin(models.Model):
	code            = models.SlugField(
		verbose_name=_("Код"), 
		blank=True, null=True,
		unique=True, 
		max_length=255, help_text=("Kод для виводу в шаблоні")
	)
	# def save(self, *args, **kwargs):
	# 	if self.code:
	# 		i = 0
	# 		code = self.code
	# 		while self._meta.model.objects.all().filter(code=code).exists():
	# 			code = f'{code}_{i}'
	# 			print(code)
	# 			i+=1
	# 		self.code = code 
	# 	super().save(*args, **kwargs)
			
	order           = models.PositiveIntegerField(
		verbose_name=_("Порядок"), default=0, blank=False, null=False
	)
	is_active       = models.BooleanField(
		verbose_name=_("Активність"), default=True, help_text=_("Відображення на сайті")
	)
	created         = models.DateTimeField(
		verbose_name=_("Створено"), default=timezone.now
	)
	updated         = models.DateTimeField(
		verbose_name=_("Оновлено"), auto_now_add=False, auto_now=True, blank=True, null=True
	)
	
	# TODO: розібратись чого BasicManager ламає поведінку ManyToManyField to="self"
	
	# objects         = BasicManager()
	objects         = models.Manager()
	ordered_objects = BasicManager()
	active_objects  = ActiveManager()

	# TODO: розібратись з is_active, related_name, фільтруванням
	class Meta:
		abstract = True 

	def get_admin_url(self):
		return get_admin_url(self)
	
	@classmethod
	def modeltranslation_fields(self):
		return []


class OverwriteStorage(FileSystemStorage):
	pass 
    # def get_available_name(self, name, *args, **kwargs):
    #     if self.exists(name):
    #         os.remove(os.path.join(settings.MEDIA_ROOT, name))
    #     return name

class AbstractPage(BaseMixin):
	meta_title = models.TextField(
		verbose_name=_("Мета-заголовок"),     blank=True, null=True, help_text=_("Заголовок сторінки в браузері, який відображається у видачі пошукових систем")
	)
	meta_descr = models.TextField(
		verbose_name=_("Мета-опис"),          blank=True, null=True, help_text=_("__")
	)
	meta_key   = models.TextField(
		verbose_name=_("Ключові слова"),      blank=True, null=True, help_text=_("Список ключових слів")
	)
	slug       = models.SlugField(
		verbose_name=_("Посилання"),          max_length=255, 
		null=True, blank=False, #unique=True
	)
	alt        = models.CharField(
		verbose_name=_("Альт до картинки"),   blank=True, null=True, max_length=255)
	image      = models.ImageField(
		verbose_name=_("Картинка"),          blank=True, null=True, storage=OverwriteStorage()
	)
	title      = models.CharField(
		verbose_name=_("Назва"),              blank=False, null=False, max_length=255, )
	description= HTMLField(
		verbose_name=_("Опис"), blank=True, null=True)

	class Meta:
		abstract = True

	def clean_slug(self):
		slug = self.cleaned_data['slug']
		return slug

	def save(self, *args, **kwargs):
		from box.core.signals import handle_slug 
		if not self.meta_title and self.title:
			self.meta_title = self.title 
		if not self.alt and self.title:
			self.alt = self.title 
		if not self.meta_descr and self.description:
			self.meta_descr = self.description
		handle_slug(self)
		super().save(*args, **kwargs)

	def __str__(self):
		return f'{self.title}'
	
	@property
	def image_url(self):
		url = core_settings.IMAGE_NOT_FOUND
		# if self.image: url = self.image.url
		if self.image: 
			try:
				x = open(self.image.path, 'r')
				url = self.image.url
			except:
				url = core_settings.IMAGE_NOT_FOUND
		return url 

	@property
	def image_path(self):
		image = ''
		if self.image:
			image = self.image.path
		return image

	@classmethod
	def modeltranslation_fields(cls):
		fields = [
			'meta_title',
			'meta_descr',
			'meta_key',
			'title',
			'description',
			'alt',
		]
		return fields 
	
	def get_absolute_url(self):
		return reverse("page", kwargs={"slug": self.slug})

class AbstractRecipientEmail(models.Model):

  email    = models.EmailField(verbose_name=_("Емайл"), max_length=255)
  is_active = models.BooleanField(verbose_name=_("Активність"), default=True)
  
  @classmethod
  def get_recipient_list(self):
    recipient_list = self._meta.model.objects.filter(
        is_active=True
    ).values_list('email', flat=True)
    recipient_list = list(recipient_list)
    recipient_list.extend(core_settings.DEFAULT_RECIPIENT_LIST)
    recipient_list = set(recipient_list)
    return recipient_list

  def __str__(self):
    return f'{self.email}, {self.is_active}' 

  class Meta:
    abstract = True 





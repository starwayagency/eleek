from django.db import models
from box.core.sw_auth.models import BoxAbstractUser
from tinymce import HTMLField
from box.core.helpers import get_admin_url


class ProjectUser(BoxAbstractUser):
    email = models.EmailField(
        'email address', blank=True,
        # unique=True, 
        unique=False,
    )

class Certificate(models.Model):
    # sdf = models.CharField(verbose_name="sdf", max_length=255)
    image = models.ImageField(verbose_name='Картинка')
    alt   = models.CharField(verbose_name="Альт", max_length=255)
    
    @classmethod
    def modeltranslation_fields(self):
        return ['alt']

    def get_admin_url(self):
        return get_admin_url(self)

    def __str__(self):
        return f'{self.image}'

    class Meta:
        verbose_name = 'Сертифікат'
        verbose_name_plural = 'Сертифікати'


class Partner(models.Model):

    image = models.ImageField(verbose_name='Картинка')
    alt   = models.CharField(verbose_name="Альт", max_length=255)
            
    def get_admin_url(self):
        return get_admin_url(self)

    @classmethod
    def modeltranslation_fields(self):
        return ['alt']

    def __str__(self):
        return f'{self.image}'

    class Meta:
        verbose_name = 'Парнтер'
        verbose_name_plural = 'Парнтери'


class TestDrive(models.Model):
    name    = models.CharField(verbose_name="Імя", max_length=255)
    phone   = models.CharField(verbose_name="Телефон", max_length=255)
    email   = models.CharField(verbose_name="Емейл", max_length=255)
    model   = models.CharField(verbose_name="Модель", max_length=255)
    message = models.CharField(verbose_name="Повідомлення", max_length=255)
        
    def get_admin_url(self):
        return get_admin_url(self)

    def __str__(self):
        return f'{self.name}, {self.phone}, {self.email}, {self.message}'

    class Meta:
        verbose_name = 'заявка на тест драйв'
        verbose_name_plural = 'Заявки на тест драйв'



class TestDriveModel(models.Model):
    name = models.CharField(verbose_name="Назва", max_length=255)
    item = models.ForeignKey(verbose_name="Товар", to="sw_catalog.Item", on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f'{self.name}, {self.item}'
        
    def get_admin_url(self):
        return get_admin_url(self)

    @classmethod
    def modeltranslation_fields(self):
        return ['name']

    class Meta:
        verbose_name = 'модель велосипеда для тест драйву'
        verbose_name_plural = 'моделі велосипедів для тест драйву'


class TestDriveSlider(models.Model):
    text  = HTMLField(verbose_name="Текст")
    item  = models.ForeignKey(verbose_name="Товар", to="sw_catalog.Item", on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(verbose_name="Картинка",)
    alt   = models.CharField(verbose_name="Альт", max_length=255, blank=True, null=True)

    def get_admin_url(self):
        return get_admin_url(self)

    def __str__(self):
        return f'{self.item}, {self.text}'
    
    @classmethod
    def modeltranslation_fields(self):
        return ['text', 'alt']

    class Meta:
        verbose_name = 'слайд з велосипедом для тест драйву'
        verbose_name_plural = 'Головний слайдер'


class VeloSlider(models.Model):
    item     = models.ForeignKey(verbose_name="Товар", to="sw_catalog.Item", on_delete=models.SET_NULL, null=True, blank=True)
    image    = models.ImageField(verbose_name="Картинка",)
    alt      = models.CharField(verbose_name="Альт", max_length=255, blank=True, null=True)
    name     = models.CharField(verbose_name="Назва", max_length=255, blank=True, null=True)
    distance = models.CharField(verbose_name="Дистанція", max_length=255)
    speed    = models.CharField(verbose_name="Макс. швидкість", max_length=255)
    power    = models.CharField(verbose_name="Потужність", max_length=255)

    def __str__(self):
        return f'{self.id}'
    
    def get_admin_url(self):
        return get_admin_url(self)

    @classmethod
    def modeltranslation_fields(self):
        return [
            'alt',
            'distance',
            'speed',
            'power',
            'name',
        ]

    class Meta:
        verbose_name = 'слайд з електровелосипедом'
        verbose_name_plural = 'Слайдер з електровелосипедами'




class Faq(models.Model):
    title = models.CharField(verbose_name="Запитання", max_length=255)
    content = HTMLField(verbose_name="Відповідь")
    is_active = models.BooleanField(verbose_name="Активність", default=True)

    def __str__(self):
        return f'{self.title}'
    
    def get_admin_url(self):
        return get_admin_url(self)

    @classmethod
    def modeltranslation_fields(self):
        return [
            'title',
            'content',
        ]

    class Meta:
        verbose_name = 'питання та відповідь'
        verbose_name_plural = 'Питання та відповіді'








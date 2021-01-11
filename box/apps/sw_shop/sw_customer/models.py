from django.contrib.auth import get_user_model 
from django.db import models 
from django.utils.translation import gettext_lazy as _


class Customer(get_user_model()):
    class Meta:
        proxy = True 
        verbose_name = _('покупець')
        verbose_name_plural = _('Список покупців')

from box.core.helpers import get_admin_url

# find . -path "*/migrations/*.py" -not -name "__init__.py" -delete

class Coupon(models.Model):
    discount_type_choices = (
        ("currency", _("сумма")),
        ("percent", "%"),
    )
    name            = models.CharField(
        verbose_name=_("Назва купона"), max_length=255, blank=False, null=False,
    )
    discount_amount = models.FloatField(
        verbose_name=_("Знижка"), blank=False, null=False,
    )
    currency = models.ForeignKey(
        verbose_name="Валюта", to="sw_currency.Currency", blank=True, null=True, on_delete=models.SET_NULL,
    )
    discount_type   = models.CharField(
        verbose_name=_("Тип знижки"), blank=False, null=False, choices=discount_type_choices, default=0, max_length=255,
    )
    requisition     = models.FloatField(
        verbose_name=_("Умова"), default=0,
        help_text=_("Мінімальна сума, на яку потрібно зробити замовлення, щоб купон набув дійсності."),
    )
    started         = models.DateTimeField(
        verbose_name="Дата початку", blank=False, null=False,
    )
    period          = models.DateTimeField(
        verbose_name=_("Термін дії"), blank=True, null=True,
    )
    # one_time        = models.BooleanField(
    #     verbose_name=_("Чи є одноразовий"), default=False,
    # )
    users = models.ManyToManyField(
        verbose_name="Користувачі", to=get_user_model(), blank=True, null=True,
    )
    # uses_amount     = models.PositiveIntegerField(
    #     verbose_name=_("К-сть використань"), default=0, blank=True, null=True,
    # )

    def __str__(self):
        return f'{self.name}, {self.discount_amount}{self.get_discount_type_display()}'
    
    def get_admin_url(self):
        return get_admin_url(self)

    def save(self, *args, **kwargs):
        if self.discount_type == 'percent' and self.discount_amount > 100:
            self.discount_amount = 100
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = _("купон")
        verbose_name_plural = _("Список купонів")


# class CustomerGroup(models.Model):
#     name      = models.CharField(verbose_name=_("Назва"), blank=False, null=False, max_length=255)
#     coupon    = models.ForeignKey(verbose_name=_("Купон"), to="sw_customer.Coupon", blank=True, null=True, on_delete=models.SET_NULL)

#     def __str__(self):
#         result = f'{self.name}'
#         if self.coupon:
#             result += f'({self.coupon})'
#         return result
    
#     class Meta:
#         verbose_name = _("група")
#         verbose_name_plural = _("Групи покупців")


# class Subscriber(models.Model):
#     email = models.EmailField(verbose_name=_("E-mail"), blank=False, null=False)

#     def __str__(self):
#         return f'{self.email}'
    
#     class Meta:
#         verbose_name = _("підписник")
#         verbose_name_plural = _("Підписники")

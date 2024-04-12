from django.db import models
from box.apps.sw_shop.sw_order.models import Order

# Create your models here.
class PrivatBankPaymentSettings(models.Model):
    store_id = models.CharField(max_length=100, verbose_name="Ідентифікатор магазину")
    password = models.CharField(max_length=100, verbose_name="Пароль магазину")

    class Meta:
        verbose_name = "Налаштування оплати частинами ПриватБанку"
        verbose_name_plural = "Налаштування оплати частинами ПриватБанку"

    def __str__(self):
        return f"Дані: Store ID: {self.store_id}. Password: {self.password}"


class PrivateBankPartPayments(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_amount = models.CharField(max_length=10)
    payment_state = models.CharField(max_length=20)
    message = models.TextField()

    class Meta:
        verbose_name = "Транзакція оплати частинами ПриватБанку"
        verbose_name_plural = "Транзакції оплат частинами ПриватБанку"

    def __str__(self):
        return f"Статус оплати {self.payment_state} для замовлення {self.order.id}"


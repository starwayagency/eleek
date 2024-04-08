from django.db import models

# Create your models here.
class PrivatBankPaymentSettings(models.Model):
    store_id = models.CharField(max_length=100, verbose_name="Ідентифікатор магазину")
    password = models.CharField(max_length=100, verbose_name="Пароль магазину")

    class Meta:
        verbose_name = "Налаштування оплати частинами ПриватБанку"
        verbose_name_plural = "Налаштування оплати частинами ПриватБанку"

    def __str__(self):
        return f"Дані: Store ID: {self.store_id}. Password: {self.password}"

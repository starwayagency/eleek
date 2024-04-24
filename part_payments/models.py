from django.db import models
from box.apps.sw_shop.sw_order.models import Order
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class PrivatBankPaymentSettings(models.Model):
    store_id = models.CharField(
        max_length=100, 
        verbose_name="Ідентифікатор магазину")
    password = models.CharField(
        max_length=100,
        verbose_name="Пароль магазину")

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


class ItemPartPayment(models.Model):
    item = models.OneToOneField(
        verbose_name="Товар", 
        to='sw_catalog.Item',
        on_delete=models.CASCADE,
        related_name='installment_option'
    )
    available = models.BooleanField(
        verbose_name="Доступно для оплати частинами",
        default=False
    )
    min_payments_count = models.PositiveIntegerField(
        verbose_name="Мінімальна кількість платежів",
        default=2,
    )
    max_payments_count = models.PositiveIntegerField(
        verbose_name="Максимальна кількість платежів",
        default=24,
    )

    def clean(self):
        if self.min_payments_count >= self.max_payments_count:
            raise ValidationError("Мінімальна кількість платежів повинна бути меншою за максимальну")

        if self.min_payments_count < 2 or self.max_payments_count > 24:
            raise ValidationError("Значення повинно бути від 2 до 24.")

    class Meta:
        verbose_name = "Опції оплати частинами для товару"
        verbose_name_plural = "Опції оплати частинами для товарів"

    def __str__(self):
        return f"Налаштування оплати частинами для товару {self.item}"
from django.db import models

# Create your models here.
class ItemPumbPayment(models.Model):
    item = models.OneToOneField(
        verbose_name="Товар", 
        to='sw_catalog.Item',
        on_delete=models.CASCADE,
        related_name='pumb_option'
    )
    available = models.BooleanField(
        verbose_name="Доступно для оплати Pumb",
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
        verbose_name = "Опції оплати Pumb для товару"
        verbose_name_plural = "Опції оплати Pumb для товарів"

    def __str__(self):
        return f"Налаштування оплати Pumb для товару {self.item}"
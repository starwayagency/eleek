# Generated by Django 3.2.8 on 2024-05-22 14:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sw_catalog', '0007_auto_20240314_2105'),
        ('project', '0012_auto_20240315_1704'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liqpay_enabled', models.BooleanField(default=True, verbose_name='LiqPay Enabled')),
                ('cash_enabled', models.BooleanField(default=True, verbose_name='Cash Payment Enabled')),
                ('item', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment_option', to='sw_catalog.item', verbose_name='Товар')),
            ],
        ),
    ]
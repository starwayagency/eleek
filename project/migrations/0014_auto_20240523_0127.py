# Generated by Django 3.2.8 on 2024-05-22 22:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sw_catalog', '0007_auto_20240314_2105'),
        ('project', '0013_paymentsettings'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='paymentsettings',
            options={'verbose_name': 'Налаштування способів оплати для товару', 'verbose_name_plural': 'Налаштування способів оплат для товарів'},
        ),
        migrations.CreateModel(
            name='DeliveryMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nova_poshta_enabled', models.BooleanField(default=True, verbose_name='Доступно для Нової Пошти')),
                ('pickup_enabled', models.BooleanField(default=True, verbose_name='Доступно для Самовивозу')),
                ('eleek_delivery_enabled', models.BooleanField(default=True, verbose_name='Доступно для Доставки від Eleek')),
                ('item', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='delivery_option', to='sw_catalog.item', verbose_name='Товар')),
            ],
            options={
                'verbose_name': 'Налаштування доставки для товару',
                'verbose_name_plural': 'Налаштування доставки для товарів',
            },
        ),
    ]
# Generated by Django 3.2.8 on 2024-05-22 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sw_content', '0005_alter_indexbannervideo_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentMethodsText',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cash_description', models.TextField(verbose_name='Опис оплати готівкою')),
                ('liqpay_description', models.TextField(verbose_name='Опис оплати LiqPay')),
                ('installment_description', models.TextField(verbose_name='Опис оплати частинами')),
            ],
            options={
                'verbose_name': 'Описи методів оплати',
                'verbose_name_plural': 'Описи методів оплати',
            },
        ),
    ]
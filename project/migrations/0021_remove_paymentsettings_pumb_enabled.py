# Generated by Django 3.2.8 on 2024-07-17 11:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0020_paymentsettings_pumb_enabled'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paymentsettings',
            name='pumb_enabled',
        ),
    ]

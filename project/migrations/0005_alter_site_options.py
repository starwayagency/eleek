# Generated by Django 3.2.8 on 2024-02-28 19:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0004_site_siteaddress_sitephone_sitesocial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='site',
            options={'verbose_name': 'Налаштування сайту', 'verbose_name_plural': 'Налаштування сайту'},
        ),
    ]
# Generated by Django 3.2.8 on 2024-03-14 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sw_catalog', '0005_auto_20240227_2127'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemcategory',
            name='is_displayed_on_main',
            field=models.BooleanField(default=False, verbose_name='Відображення в бургер-меню'),
        ),
    ]

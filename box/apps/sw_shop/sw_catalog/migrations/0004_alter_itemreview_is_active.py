# Generated by Django 3.2.8 on 2024-02-26 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sw_catalog', '0003_auto_20210111_0937'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemreview',
            name='is_active',
            field=models.BooleanField(default=False, verbose_name='Відображення на сайті'),
        ),
    ]
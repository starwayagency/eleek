# Generated by Django 3.0.7 on 2020-09-23 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sw_catalog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='attributecategory',
            name='code',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True, verbose_name='Код'),
        ),
    ]

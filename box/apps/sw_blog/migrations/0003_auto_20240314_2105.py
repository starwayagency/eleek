# Generated by Django 3.2.8 on 2024-03-14 19:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sw_blog', '0002_auto_20240227_2127'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='alt_ru',
        ),
        migrations.RemoveField(
            model_name='post',
            name='description_ru',
        ),
        migrations.RemoveField(
            model_name='post',
            name='meta_descr_ru',
        ),
        migrations.RemoveField(
            model_name='post',
            name='meta_key_ru',
        ),
        migrations.RemoveField(
            model_name='post',
            name='meta_title_ru',
        ),
        migrations.RemoveField(
            model_name='post',
            name='title_ru',
        ),
        migrations.RemoveField(
            model_name='postcategory',
            name='alt_ru',
        ),
        migrations.RemoveField(
            model_name='postcategory',
            name='description_ru',
        ),
        migrations.RemoveField(
            model_name='postcategory',
            name='meta_descr_ru',
        ),
        migrations.RemoveField(
            model_name='postcategory',
            name='meta_key_ru',
        ),
        migrations.RemoveField(
            model_name='postcategory',
            name='meta_title_ru',
        ),
        migrations.RemoveField(
            model_name='postcategory',
            name='title_ru',
        ),
    ]

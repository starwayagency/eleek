# Generated by Django 3.2.8 on 2024-05-27 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0015_veloslider_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='veloslider',
            name='link',
        ),
        migrations.AddField(
            model_name='testdriveslider',
            name='link',
            field=models.URLField(blank=True, null=True, verbose_name='Посилання'),
        ),
    ]
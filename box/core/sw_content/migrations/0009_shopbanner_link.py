# Generated by Django 3.2.8 on 2024-06-13 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sw_content', '0008_shopbanner'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopbanner',
            name='link',
            field=models.URLField(blank=True, null=True, verbose_name='Посилання'),
        ),
    ]

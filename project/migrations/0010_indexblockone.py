# Generated by Django 3.2.8 on 2024-03-14 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0009_auto_20240314_2126'),
    ]

    operations = [
        migrations.CreateModel(
            name='IndexBlockOne',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=512, verbose_name='Заголовок')),
                ('title_uk', models.CharField(max_length=512, null=True, verbose_name='Заголовок')),
                ('title_en', models.CharField(max_length=512, null=True, verbose_name='Заголовок')),
                ('description', models.TextField(max_length=512, verbose_name='Опис')),
                ('description_uk', models.TextField(max_length=512, null=True, verbose_name='Опис')),
                ('description_en', models.TextField(max_length=512, null=True, verbose_name='Опис')),
                ('button', models.CharField(max_length=512, verbose_name='Кнопка')),
                ('button_uk', models.CharField(max_length=512, null=True, verbose_name='Кнопка')),
                ('button_en', models.CharField(max_length=512, null=True, verbose_name='Кнопка')),
                ('button_link', models.CharField(max_length=512, verbose_name='Посилання')),
                ('image1', models.ImageField(max_length=512, upload_to='', verbose_name='Картинка 1')),
                ('image2', models.ImageField(max_length=512, upload_to='', verbose_name='Картинка 2')),
                ('image3', models.ImageField(max_length=512, upload_to='', verbose_name='Картинка 3')),
            ],
            options={
                'verbose_name': 'Головна - перший блок',
                'verbose_name_plural': 'Головна - перший блок',
            },
        ),
    ]

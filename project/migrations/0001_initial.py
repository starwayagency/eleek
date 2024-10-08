# Generated by Django 3.0.4 on 2020-09-23 07:45

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.utils.timezone
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('phone_number', models.CharField(blank=True, max_length=255, null=True, verbose_name='Номер телефону')),
                ('address', models.TextField(blank=True, null=True, verbose_name='Адреса')),
                ('birth_date', models.DateTimeField(blank=True, null=True, verbose_name='Дата народження')),
                ('gender', models.CharField(choices=[['u', 'Невідомо'], ['m', 'Чоловік'], ['f', 'Жінка']], default='m', max_length=20, verbose_name='Стать')),
                ('first_name', models.CharField(blank=True, max_length=30, null=True, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, null=True, verbose_name='last name')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sdf', models.CharField(max_length=255, verbose_name='sdf')),
                ('image', models.ImageField(upload_to='', verbose_name='Картинка')),
                ('alt', models.CharField(max_length=255, verbose_name='Альт')),
                ('alt_uk', models.CharField(max_length=255, null=True, verbose_name='Альт')),
                ('alt_en', models.CharField(max_length=255, null=True, verbose_name='Альт')),
                ('alt_ru', models.CharField(max_length=255, null=True, verbose_name='Альт')),
            ],
            options={
                'verbose_name': 'Сертифікат',
                'verbose_name_plural': 'Сертифікати',
            },
        ),
        migrations.CreateModel(
            name='Faq',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Запитання')),
                ('title_uk', models.CharField(max_length=255, null=True, verbose_name='Запитання')),
                ('title_en', models.CharField(max_length=255, null=True, verbose_name='Запитання')),
                ('title_ru', models.CharField(max_length=255, null=True, verbose_name='Запитання')),
                ('content', tinymce.models.HTMLField(verbose_name='Відповідь')),
                ('content_uk', tinymce.models.HTMLField(null=True, verbose_name='Відповідь')),
                ('content_en', tinymce.models.HTMLField(null=True, verbose_name='Відповідь')),
                ('content_ru', tinymce.models.HTMLField(null=True, verbose_name='Відповідь')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активність')),
            ],
            options={
                'verbose_name': 'питання та відповідь',
                'verbose_name_plural': 'Питання та відповіді',
            },
        ),
        migrations.CreateModel(
            name='Partner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='', verbose_name='Картинка')),
                ('alt', models.CharField(max_length=255, verbose_name='Альт')),
                ('alt_uk', models.CharField(max_length=255, null=True, verbose_name='Альт')),
                ('alt_en', models.CharField(max_length=255, null=True, verbose_name='Альт')),
                ('alt_ru', models.CharField(max_length=255, null=True, verbose_name='Альт')),
            ],
            options={
                'verbose_name': 'Парнтер',
                'verbose_name_plural': 'Парнтери',
            },
        ),
        migrations.CreateModel(
            name='TestDrive',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Імя')),
                ('phone', models.CharField(max_length=255, verbose_name='Телефон')),
                ('email', models.CharField(max_length=255, verbose_name='Емейл')),
                ('model', models.CharField(max_length=255, verbose_name='Модель')),
                ('message', models.CharField(max_length=255, verbose_name='Повідомлення')),
            ],
            options={
                'verbose_name': 'заявка на тест драйв',
                'verbose_name_plural': 'Заявки на тест драйв',
            },
        ),
        migrations.CreateModel(
            name='TestDriveModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Назва')),
                ('name_uk', models.CharField(max_length=255, null=True, verbose_name='Назва')),
                ('name_en', models.CharField(max_length=255, null=True, verbose_name='Назва')),
                ('name_ru', models.CharField(max_length=255, null=True, verbose_name='Назва')),
            ],
            options={
                'verbose_name': 'модель велосипеда для тест драйву',
                'verbose_name_plural': 'моделі велосипедів для тест драйву',
            },
        ),
        migrations.CreateModel(
            name='TestDriveSlider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', tinymce.models.HTMLField(verbose_name='Текст')),
                ('text_uk', tinymce.models.HTMLField(null=True, verbose_name='Текст')),
                ('text_en', tinymce.models.HTMLField(null=True, verbose_name='Текст')),
                ('text_ru', tinymce.models.HTMLField(null=True, verbose_name='Текст')),
                ('image', models.ImageField(upload_to='', verbose_name='Картинка')),
                ('alt', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
                ('alt_uk', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
                ('alt_en', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
                ('alt_ru', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
            ],
            options={
                'verbose_name': 'слайд з велосипедом для тест драйву',
                'verbose_name_plural': 'Головний слайдер',
            },
        ),
        migrations.CreateModel(
            name='VeloSlider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='', verbose_name='Картинка')),
                ('alt', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
                ('alt_uk', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
                ('alt_en', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
                ('alt_ru', models.CharField(blank=True, max_length=255, null=True, verbose_name='Альт')),
                ('name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Назва')),
                ('name_uk', models.CharField(blank=True, max_length=255, null=True, verbose_name='Назва')),
                ('name_en', models.CharField(blank=True, max_length=255, null=True, verbose_name='Назва')),
                ('name_ru', models.CharField(blank=True, max_length=255, null=True, verbose_name='Назва')),
                ('distance', models.CharField(max_length=255, verbose_name='Дистанція')),
                ('distance_uk', models.CharField(max_length=255, null=True, verbose_name='Дистанція')),
                ('distance_en', models.CharField(max_length=255, null=True, verbose_name='Дистанція')),
                ('distance_ru', models.CharField(max_length=255, null=True, verbose_name='Дистанція')),
                ('speed', models.CharField(max_length=255, verbose_name='Макс. швидкість')),
                ('speed_uk', models.CharField(max_length=255, null=True, verbose_name='Макс. швидкість')),
                ('speed_en', models.CharField(max_length=255, null=True, verbose_name='Макс. швидкість')),
                ('speed_ru', models.CharField(max_length=255, null=True, verbose_name='Макс. швидкість')),
                ('power', models.CharField(max_length=255, verbose_name='Потужність')),
                ('power_uk', models.CharField(max_length=255, null=True, verbose_name='Потужність')),
                ('power_en', models.CharField(max_length=255, null=True, verbose_name='Потужність')),
                ('power_ru', models.CharField(max_length=255, null=True, verbose_name='Потужність')),
            ],
            options={
                'verbose_name': 'слайд з електровелосипедом',
                'verbose_name_plural': 'Слайдер з електровелосипедами',
            },
        ),
    ]

# Generated by Django 3.2.8 on 2024-02-28 19:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20240227_2127'),
    ]

    operations = [
        migrations.CreateModel(
            name='Site',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favico', models.ImageField(blank=True, max_length=512, null=True, upload_to='site/', verbose_name='Favico')),
                ('schedule', models.CharField(blank=True, max_length=256, null=True, verbose_name='Schedule')),
                ('created', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, null=True, verbose_name='Updated')),
            ],
            options={
                'verbose_name': 'Site configuration',
                'verbose_name_plural': 'Site configuration',
            },
        ),
        migrations.CreateModel(
            name='SiteSocial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, verbose_name='Текст')),
                ('svg_content', models.TextField(blank=True, verbose_name='SVG контент')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='socials', to='project.site', verbose_name='Налаштування')),
            ],
            options={
                'verbose_name': 'Соціальна мережа',
                'verbose_name_plural': 'Соціальні мережі',
            },
        ),
        migrations.CreateModel(
            name='SitePhone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, verbose_name='Телефон')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phones', to='project.site', verbose_name='Налаштування')),
            ],
            options={
                'verbose_name': 'Телефон',
                'verbose_name_plural': 'Телефони',
            },
        ),
        migrations.CreateModel(
            name='SiteAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, verbose_name='Адреса')),
                ('link', models.CharField(blank=True, max_length=512, null=True, verbose_name='Посилання')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to='project.site', verbose_name='Налаштування')),
            ],
            options={
                'verbose_name': 'Адреса',
                'verbose_name_plural': 'Адреси',
            },
        ),
    ]

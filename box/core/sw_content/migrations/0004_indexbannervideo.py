# Generated by Django 3.2.8 on 2024-05-17 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sw_content', '0003_auto_20240314_2105'),
    ]

    operations = [
        migrations.CreateModel(
            name='IndexBannerVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('video', models.FileField(upload_to='videos/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Index Banner Video',
            },
        ),
    ]

# Generated by Django 3.1.3 on 2021-02-17 19:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('project', '0004_remove_certificate_sdf'),
    ]

    operations = [
        migrations.AddField(
            model_name='veloslider',
            name='item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='sw_catalog.item', verbose_name='Товар'),
        ),
        migrations.AddField(
            model_name='testdriveslider',
            name='item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='sw_catalog.item', verbose_name='Товар'),
        ),
        migrations.AddField(
            model_name='testdrivemodel',
            name='item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='sw_catalog.item', verbose_name='Товар'),
        ),
    ]
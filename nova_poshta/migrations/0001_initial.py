# Generated by Django 3.2 on 2024-01-02 18:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=255, verbose_name='Область')),
                ('ref', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ref')),
            ],
            options={
                'verbose_name': 'Область',
                'verbose_name_plural': 'Області',
            },
        ),
        migrations.CreateModel(
            name='Settlement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=255, verbose_name='Населений пункт')),
                ('ref', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ref')),
                ('area', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='nova_poshta.area', verbose_name='Область')),
            ],
            options={
                'verbose_name': 'Населений пункт',
                'verbose_name_plural': 'Населені пункти',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='SettlementType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=255, verbose_name='Тип населеного пункту')),
                ('short_desc', models.CharField(blank=True, max_length=255, null=True, verbose_name='Скорочено')),
                ('ref', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ref')),
                ('settlemnt_ref', models.CharField(blank=True, max_length=255, null=True, verbose_name='Населений пункт')),
            ],
            options={
                'verbose_name': 'Тип населеного пункту',
                'verbose_name_plural': 'Типи населених пунктів',
            },
        ),
        migrations.CreateModel(
            name='WarehouseType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=255, verbose_name='Тип відділення')),
                ('ref', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ref')),
            ],
            options={
                'verbose_name': 'Тип відділення',
                'verbose_name_plural': 'Типи відділень',
            },
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=255, verbose_name='Відділення')),
                ('short_address', models.CharField(db_index=True, max_length=255, verbose_name='Короткий адрес')),
                ('ref', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ref')),
                ('settlement', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='nova_poshta.settlement', verbose_name='Населений пункт')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='nova_poshta.warehousetype', verbose_name='Тип відділення')),
            ],
            options={
                'verbose_name': 'Відділення',
                'verbose_name_plural': 'Відділення',
                'ordering': ['title'],
            },
        ),
        migrations.AddField(
            model_name='settlement',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='nova_poshta.settlementtype', verbose_name='Тип населеного пункту'),
        ),
    ]

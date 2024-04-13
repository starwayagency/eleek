from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('part_payments', '0002_privatebankpartpayments'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='privatebankpartpayments',
            options={'verbose_name': 'Транзакція оплати частинами ПриватБанку', 'verbose_name_plural': 'Транзакції оплат частинами ПриватБанку'},
        ),
    ]

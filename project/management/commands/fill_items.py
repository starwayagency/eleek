from django.core.management.base import BaseCommand
from box.apps.sw_shop.sw_catalog.models import * 


from random import choice, randrange, randint 

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        items = Item.objects.all()[0:4]
        for item in items:
            item.title = 

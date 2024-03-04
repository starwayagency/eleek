from box.apps.sw_shop.sw_cart.models import Cart
from box.apps.sw_shop.sw_catalog.models import ItemReview
from django.core.management.base import BaseCommand
from django.contrib.sessions.models import Session
from django.contrib.admin.models import LogEntry

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        Session.objects.all().delete()
        LogEntry.objects.all().delete()
        Cart.objects.filter(ordered=False).delete()

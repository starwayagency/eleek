from box.apps.sw_shop.sw_catalog.models import ItemReview
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        ItemReview.objects.filter(text__contains="http").delete()



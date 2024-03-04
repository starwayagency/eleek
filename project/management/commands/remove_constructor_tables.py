import sqlite3

from box.apps.sw_shop.sw_catalog.models import ItemReview
from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    def handle(self, *args, **kwargs):

        with sqlite3.connect(settings.BASE_DIR / 'db.sqlite3') as connection:
            tables = [
            "constructor_framecolor",
            "constructor_frametype",
            "constructor_frametype_items",
            "constructor_parameter",
            "constructor_relationship",
            "constructor_tab",
            "constructor_tabgroup",
            "constructor_value",
            ]
            queries =[f"DROP TABLE IF EXISTS {table};" for table in tables]
            for query in queries:
                connection.execute(query)


import tablib
import argparse
from pathlib import Path

from django.conf import settings
from django.core.management import BaseCommand
from django.db.models import Model
from import_export import resources, fields
from import_export.resources import ModelResource
from import_export.results import RowResult
from import_export.widgets import ManyToManyWidget
from import_export.resources import modelresource_factory

from box.apps.sw_shop.sw_catalog.models import Item, ItemCategory, ItemManufacturer, ItemBrand, ItemStock, ItemUnit
from box.core.sw_currency.models import Currency
from box.core.sw_global_config.models import GlobalMarker, GlobalLabel

# Keep models in order!!!
models = [
    GlobalMarker,
    GlobalLabel,
    Currency,
    ItemManufacturer,
    ItemBrand,
    ItemStock,
    ItemUnit,

    ItemCategory,
    Item,

]


class PathHandler:
    def __init__(self, model, relative_path: str):
        self.model = model
        self.relative_path = relative_path

    @property
    def file_path(self) -> Path:
        label = self.model._meta.label
        folder_label = label[: label.rfind(".")]
        file_name = label[label.rfind(".") + 1 :] + ".csv"
        file_path = Path(settings.BASE_DIR) / self.relative_path / folder_label / file_name
        return file_path

    @property
    def folder_path(self) -> Path:
        label = self.model._meta.label
        folder_label = label[: label.rfind(".")]
        folder_path = Path(settings.BASE_DIR) / self.relative_path / folder_label
        return folder_path

    def create_dir(self):
        self.folder_path.mkdir(parents=True, exist_ok=True)


class CustomResource(ModelResource):
    def get_field_names(self):
        names = []
        for field in self.get_fields():
            names.append(self.get_field_name(field))
        return names

    def import_row(self, row, instance_loader, **kwargs):
        import_result = super(ModelResource, self).import_row(
            row, instance_loader, **kwargs
        )
        if import_result.import_type == RowResult.IMPORT_TYPE_ERROR:
            import_result.diff = [row.get(name, "") for name in self.get_field_names()]
            import_result.diff.append(
                "Errors: {}".format([err.error for err in import_result.errors])
            )
            # breakpoint()
            if import_result.errors:
                raise import_result.errors[0].error
            print("Errors: {}".format([(err.error, err.traceback) for err in import_result.errors]))
            import_result.errors = []
            import_result.import_type = RowResult.IMPORT_TYPE_SKIP
        return import_result

    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        total_skipped = 0
        for row in result.rows:
            if "Errors: " in row.diff[-1]:
                total_skipped += 1
                print(row.diff[-1])
        print(f"{result.total_rows - total_skipped} out of {result.total_rows} ({self.Meta.model.__name__})")
        return super(ModelResource, self).after_import(
            dataset, result, using_transactions, dry_run, **kwargs
        )


class ResourceGenerator:
    @staticmethod
    def set_m2m_fields(model: Model, resource: ModelResource):
        resource.Meta.fields = []
        resource.Meta.model = model
        concrete_fields = model._meta.concrete_fields
        for field in model._meta.get_fields():
            if field in concrete_fields and field.many_to_many:
                resource.Meta.fields.append(field.name)
                related_model = field.related_model
                setattr(
                    resource,
                    field.name,
                    fields.Field(widget=ManyToManyWidget(related_model)),
                )


    @classmethod
    def get_resource(cls, model) -> resources.ModelResource:
        resource = modelresource_factory(model=model, resource_class=CustomResource)()
        cls.set_m2m_fields(model, resource)
        return resource


def exp(path: str):
    for model in models:
        path_handler = PathHandler(model=model, relative_path=path)
        path_handler.create_dir()
        resource = ResourceGenerator.get_resource(model=model)
        data = resource.export().csv
        with open(path_handler.file_path, 'w', newline='', encoding='utf8') as file:
            file.write(data)
        print(f'{model.__name__:<30} Success!')


def imp(path: str):
    for model in models:
        path_handler = PathHandler(model=model, relative_path=path)
        resource = ResourceGenerator.get_resource(model=model)
        dataset = tablib.Dataset()
        try:
            with open(path_handler.file_path, 'r', newline='', encoding='utf-8') as file:
                dataset.load(file.read(), format='csv')
                resource.import_data(dataset, raise_errors=True)
        except FileNotFoundError as e:
            print(
                f'WARNING: file was not found: {e}'
            )


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        path = "data/export/"
        exp(path)
        [x.save() for x in ItemManufacturer.objects.all()]
        # imp(path)

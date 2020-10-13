from django.contrib import admin 
from django.forms import Textarea

from import_export.admin import ImportExportModelAdmin
from modeltranslation.admin import TabbedTranslationAdmin, TranslationTabularInline, TranslationStackedInline
from nested_admin import NestedTabularInline, NestedStackedInline, NestedModelAdmin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin 

from box.core.utils import AdminImageWidget

from .models import * 
from .resources import * 


class ChildrenRelationshipInline(NestedTabularInline):
    verbose_name = "Дочірній елемент"
    verbose_name_plural = "Дочірні елементи"
    autocomplete_fields = ['children']
    model = Relationship
    exclude = []
    extra = 0
    classes = ['collapse']
    fk_name = 'parent'
    def has_add_permission(self, request, obj):
        return False


class ParentRelationshipInline(NestedTabularInline):
    verbose_name = "Батьківський елемент"
    verbose_name_plural = "Батьківські елементи"
    autocomplete_fields = ['parent']
    model = Relationship
    exclude = []
    extra = 0
    classes = ['collapse']
    fk_name = 'children'
    def has_add_permission(self, request, obj):
        return False


class ValueInline(
    # SortableInlineAdminMixin,
    NestedTabularInline,
    admin.TabularInline
    # # # # TranslationTabularInline,
    ):
    model = Value
    exclude = []
    extra = 0
    classes = ['collapse']
    # inlines = [
    #     ChildrenRelationshipInline,
    #     ParentRelationshipInline,
    # ]
    readonly_fields = ['code']
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }


class ParameterInline(
    # SortableInlineAdminMixin,
    NestedTabularInline,
    admin.TabularInline,
    # # # # TranslationTabularInline,
    ):
    model = Parameter
    exclude = []
    extra = 0
    classes = ['collapse']
    inlines = [
        ValueInline,
    ]
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }


class TabGroupInline(
    # SortableInlineAdminMixin,
    NestedTabularInline,
    # admin.TabularInline,
    # # # # TranslationTabularInline,
    ):
    model = TabGroup
    exclude = []
    extra = 0
    classes = ['collapse']
    inlines = [
        ParameterInline,
    ]
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }


class TabInline(
    # SortableInlineAdminMixin,
    NestedTabularInline,
    TranslationTabularInline,
    # admin.TabularInline,
    ):
    model = Tab 
    exclude = []
    extra = 0
    classes = ['collapse']
    inlines = [
        TabGroupInline,
    ]
    readonly_fields = ['code']
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }


class FrameColorInline(
    # SortableInlineAdminMixin,
    NestedTabularInline,
    # admin.TabularInline,
    TranslationTabularInline,
    ):
    model = FrameColor 
    exclude = []
    extra = 0
    classes = ['collapse']
    autocomplete_fields = [
        'attribute_value',
        'frame',
    ]
    


@admin.register(FrameType)
class FrameTypeAdmin(
    ImportExportModelAdmin,
    NestedModelAdmin,
    # SortableAdminMixin,
    TabbedTranslationAdmin,
    ):
    resource_class = FrameTypeResource
    exclude = ['color']
    search_fields = ['name','code']
    inlines = [
        TabInline, 
        FrameColorInline,
    ]
    readonly_fields = ['code']
    autocomplete_fields = ['items']
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }


@admin.register(Tab)
class TabAdmin(
    ImportExportModelAdmin, 
    TabbedTranslationAdmin,
    # SortableAdminMixin,
    NestedModelAdmin,
    ):
    resource_class = TabResource
    readonly_fields = ['code']
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }
    inlines = [
        TabGroupInline,
    ]
    search_fields = ['name']
    autocomplete_fields = ['frame']


@admin.register(TabGroup)
class TabGroupAdmin(
    ImportExportModelAdmin, 
    TabbedTranslationAdmin,
    # SortableAdminMixin,
    NestedModelAdmin,
    ):
    resource_class = TabGroupResource
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }
    inlines = [
        ParameterInline,
    ]
    search_fields = ['name']
    autocomplete_fields = ['tab']


@admin.register(Parameter)
class ParameterAdmin(
    ImportExportModelAdmin, 
    # SortableAdminMixin,
    TabbedTranslationAdmin,
    NestedModelAdmin,
    ):
    resource_class = ParameterResource
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }
    inlines = [
        ValueInline,
    ]
    list_display = [
        'id',
        'code',
        'name',
        'tab_group',
        'attr',
        'feature',
    ]
    search_fields = ['name']
    autocomplete_fields = [
        'tab_group',
        'attr',
        'feature',
    ]


@admin.register(Value)
class ValueAdmin(
    TabbedTranslationAdmin,
    ImportExportModelAdmin,
    # SortableAdminMixin,
    ):
    resource_class = ValueResource
    inlines = [
        ChildrenRelationshipInline,
        ParentRelationshipInline,
    ]
    search_fields = [
        'name','code','color'
    ]
    autocomplete_fields = [
        'parameter',
        'attr_value',
        'value',
    ]
    list_display = [
        'id',
        'code',
        'name',
        'parameter',
        'attr_value',
        'value',
    ]
    readonly_fields = ['code']
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }


@admin.register(Relationship)
class RelationshipAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(FrameColor)
class FrameColorAdmin(
    TabbedTranslationAdmin,
    ImportExportModelAdmin,
    ):
    resource_class = FrameColorResource
    readonly_fields = ['code']
    formfield_overrides = {
        models.ImageField:{"widget":AdminImageWidget},
        models.TextField: {'widget': Textarea(attrs={'rows': 1,'cols': 40})},
    }
    autocomplete_fields = [
        'attribute_value',
        'frame',
    ]

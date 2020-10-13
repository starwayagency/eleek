from django.contrib import admin
from box.core.sw_auth.admin import BoxUserAdmin
from django.contrib.auth import get_user_model
from .models import * 
from .resources import * 
from import_export.admin import ImportExportModelAdmin
from modeltranslation.admin import TabbedTranslationAdmin
from box.core.utils import AdminImageWidget
admin.site.register(get_user_model(), BoxUserAdmin)


@admin.register(Certificate)
class CertificateAdmin(
    TabbedTranslationAdmin,
    ImportExportModelAdmin,
    ):
    formfield_overrides = {
        models.ImageField:{'widget':AdminImageWidget}
    }
    resource_class = CertificateResource 


@admin.register(Partner)
class PartnerAdmin(
    TabbedTranslationAdmin,
    ImportExportModelAdmin,
    ):
    formfield_overrides = {
        models.ImageField:{'widget':AdminImageWidget}
    }
    resource_class = PartnerResource 


@admin.register(TestDriveModel)
class TestDriveModelAdmin(
    TabbedTranslationAdmin,
    ImportExportModelAdmin,
    ):
    formfield_overrides = {
        models.ImageField:{'widget':AdminImageWidget}
    }
    autocomplete_fields = [
        'item',
    ]
    resourcce_class = TestDriveModelResource


@admin.register(VeloSlider)
class VeloSliderAdmin(
    TabbedTranslationAdmin,
    ImportExportModelAdmin,
    ):
    formfield_overrides = {
        models.ImageField:{'widget':AdminImageWidget}
    }
    resource_class = VeloSliderResource


@admin.register(TestDriveSlider)
class TestDriveSliderAdmin(
    TabbedTranslationAdmin,
    ImportExportModelAdmin,
    ):
    formfield_overrides = {
        models.ImageField:{'widget':AdminImageWidget}
    }
    autocomplete_fields = [
        'item',
    ]
    resource_class = TestDriveSliderResource


@admin.register(TestDrive)
class TestDriveAdmin(admin.ModelAdmin):
    pass 



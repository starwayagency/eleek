from django.contrib import admin
from django.contrib.admin.widgets import AdminFileWidget
from django.utils.safestring import mark_safe

from box.core.sw_auth.admin import BoxUserAdmin
from django.contrib.auth import get_user_model
from .models import * 
from .resources import * 
from import_export.admin import ImportExportModelAdmin
from modeltranslation.admin import TabbedTranslationAdmin, TranslationStackedInline
from box.core.utils import AdminImageWidget
from .models import PaymentSettings, DeliveryMethod
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


@admin.register(Faq)
class FaqAdmin(TabbedTranslationAdmin):
    pass


class SitePhoneInlineAdmin(admin.StackedInline):
    model = SitePhone
    extra = 0


class SiteAddressInlineAdmin(TranslationStackedInline):
    model = SiteAddress
    extra = 0


class SiteSocialInlineAdmin(admin.StackedInline):
    model = SiteSocial
    extra = 0


class SiteEmailInlineAdmin(admin.StackedInline):
    model = SiteEmail
    extra = 0


@admin.register(SitePhone)
class SitePhoneAdmin(admin.ModelAdmin):
    pass


@admin.register(SiteAddress)
class SiteAddressAdmin(TabbedTranslationAdmin):
    pass


@admin.register(SiteSocial)
class SiteSocialAdmin(admin.ModelAdmin):
    pass


@admin.register(SiteEmail)
class SiteEmailAdmin(admin.ModelAdmin):
    pass


@admin.register(Site)
class SiteAdmin(TabbedTranslationAdmin):
    inlines = [SitePhoneInlineAdmin, SiteAddressInlineAdmin, SiteSocialInlineAdmin, SiteEmailInlineAdmin]

    formfield_overrides = {
        models.ImageField:{'widget': AdminImageWidget},
    }

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(IndexBlockOne)
class IndexBlockOneAdmin(TabbedTranslationAdmin):

    formfield_overrides = {
        models.ImageField:{'widget': AdminImageWidget},
    }

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(IndexBlockTwo)
class IndexBlockTwoAdmin(TabbedTranslationAdmin):

    formfield_overrides = {
        models.ImageField:{'widget': AdminImageWidget},
    }

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


class PaymentSettingsAdmin(admin.ModelAdmin):
    list_display = ('item', 'liqpay_enabled', 'cash_enabled')
    list_filter = ('liqpay_enabled', 'cash_enabled')

admin.site.register(PaymentSettings, PaymentSettingsAdmin)


class DeliverySettingsAdmin(admin.ModelAdmin):
    list_display = ('item', 'nova_poshta_enabled', 
                   'pickup_enabled', 'eleek_delivery_enabled'
    )
    list_filter = ('nova_poshta_enabled', 'pickup_enabled', 
        'eleek_delivery_enabled'
    )

admin.site.register(DeliveryMethod, DeliverySettingsAdmin)

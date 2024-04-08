from django.contrib import admin
from .models import PrivatBankPaymentSettings

# Register your models here.
class PrivatBankPaymentSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        count = PrivatBankPaymentSettings.objects.count()
        if count == 0:
            return True
        else:
            return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(PrivatBankPaymentSettings, PrivatBankPaymentSettingsAdmin)

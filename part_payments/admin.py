from django.contrib import admin
from .models import PrivatBankPaymentSettings
from .models import PrivateBankPartPayments
from .models import ItemPartPayment

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


class PrivateBankPartPaymentsAdmin(admin.ModelAdmin):
    readonly_fields = ('order', 'payment_state', 'message')

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(PrivatBankPaymentSettings, PrivatBankPaymentSettingsAdmin)
admin.site.register(PrivateBankPartPayments, PrivateBankPartPaymentsAdmin)
admin.site.register(ItemPartPayment)
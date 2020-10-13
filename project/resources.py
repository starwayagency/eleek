from import_export.resources import ModelResource
from .models import * 


class CertificateResource(ModelResource):
    class Meta:
        model = Certificate
        exclude = []


class PartnerResource(ModelResource):
    class Meta:
        model = Partner
        exclude = []


class TestDriveModelResource(ModelResource):
    class Meta:
        model = TestDriveModel
        exclude = []


class TestDriveSliderResource(ModelResource):
    class Meta:
        model = TestDriveSlider
        exclude = []


class VeloSliderResource(ModelResource):
    class Meta:
        model = VeloSlider
        exclude = []


class FaqResource(ModelResource):
    class Meta:
        model = Faq
        exclude = []








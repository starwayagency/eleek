from import_export.resources import ModelResource
from .models import * 

base_exclude = ['created','updated',]

class BaseResource(ModelResource):
    def before_import_row(self, row, **kwargs): 
        if row.get('code') == '': row['code'] = None 
        
# # # # # # # # # # # # 


class FrameColorResource(BaseResource):
    class Meta: 
        model = FrameColor; 
        exclude = base_exclude; 


class FrameTypeResource(BaseResource):
    class Meta: 
        model = FrameType; 
        exclude = base_exclude; 


class TabResource(BaseResource):
    class Meta: 
        model = Tab; 
        exclude = base_exclude; 


class TabGroupResource(BaseResource):
    class Meta: 
        model = TabGroup; 
        exclude = base_exclude; 


class ParameterResource(BaseResource):
    class Meta: 
        model = Parameter; 
        exclude = base_exclude; 


class ValueResource(BaseResource):
    class Meta: 
        model = Value; 
        exclude = base_exclude; 

class RelationshipResource(BaseResource):
    class Meta: 
        model = Relationship; 
        exclude = base_exclude; 

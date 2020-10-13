from django.db import models 
from colorfield.fields import ColorField
from box.core.helpers import get_admin_url
import json 
# # # # # # # # # # # # 
 
class ActiveMixin(models.Model):
    is_active = models.BooleanField(verbose_name="Активність", default=True)

    class Meta: 
        abstract = True 


class TimestampMixin(models.Model):
    created = models.DateTimeField(verbose_name="Створено", auto_now=False, auto_now_add=True)
    updated = models.DateTimeField(verbose_name="Оновлено", auto_now=True, auto_now_add=False)

    class Meta: 
        abstract = True 


class CodeMixin(models.Model):
    code = models.SlugField(verbose_name="Код", max_length=255, blank=True, null=True)
    
    class Meta: 
        abstract = True 


class NameMixin(models.Model):
    name = models.CharField(verbose_name="Назва", max_length=255, blank=True, null=True)

    class Meta: 
        abstract = True 

    @classmethod
    def modeltranslation_fields(self):
        return ['name',]


class ImageMixin(models.Model):
    image = models.ImageField(verbose_name="Зображення",  blank=True, null=True)

    @property
    def image_url(self):
        image_url = ''
        if self.image:
            image_url = self.image.url
        return image_url

    class Meta: 
        abstract = True 


class PriceMixin(models.Model):
    price = models.FloatField(verbose_name="Ціна", blank=True, null=True, default=0)

    class Meta: 
        abstract = True 


class ColorMixin(models.Model):
    color = ColorField(verbose_name="Колір", blank=True, null=True)

    class Meta: 
        abstract = True 


class FrameMixin(models.Model):
    frame = models.ForeignKey(verbose_name="Рама", to="constructor.FrameType", blank=True, null=True, on_delete=models.SET_NULL)

    class Meta: 
        abstract = True 


class BaseMixin(ActiveMixin, TimestampMixin):
    # order = models.IntegerField(verbose_name="Порядок", default=0, blank=False, null=False)

    class Meta: 
        abstract = True 

    def get_admin_url(self):
        return get_admin_url(self)


class GeneralMixin(BaseMixin,ColorMixin,PriceMixin,NameMixin,ImageMixin,CodeMixin):

    class Meta: 
        abstract = True 

    def __str__(self):
        return f"Код:{self.code},Назва:{self.name},Зображення:{self.image},Ціна:{self.price},Колір:{self.color}"

# # # # # # # # # # # # 


class FrameType(GeneralMixin):
    POZITIFF_CODE = 'pozitiff'
    NEO_CODE      = 'neo'
    LITE_CODE     = 'lite'
    EKROSS_CODE   = 'ekross'
    items = models.ManyToManyField(verbose_name="Товар", to="sw_catalog.Item", blank=True, null=True)

    def get_tabs(self):
        return Tab.objects.filter(frame=self, is_active=True)
    
    def get_colors(self):
        return FrameColor.objects.filter(frame=self, is_active=True)

    def get_initial_price(self):
        initial_price = 0
        initial_price += self.price 
        # for value in Value.objects.filter(parameter__tab_group__tab__frame=self, is_active=True):
        parameters = Parameter.objects.filter(
            is_active=True, tab_group__tab__frame=self,
        ).exclude(
            type__in=['checkbox_options','radio_color'],
        )
        for parameter in parameters:
            value = parameter.get_values().first()
            initial_price += value.price 
            # print(value.price, value)
        initial_price = str(initial_price).split('.')[0]
        initial_price = initial_price[::-1]
        initial_price = [(initial_price[i:i+3]) for i in range(0, len(initial_price), 3)] 
        initial_price = ' '.join(initial_price)
        initial_price = initial_price[::-1]
        return initial_price
    
    class Meta: 
        # ordering = ['order']
        verbose_name = "Тип рами"
        verbose_name_plural = "Типи рами"


class FrameColor(GeneralMixin, FrameMixin):
    attribute_value = models.ForeignKey(
        verbose_name="Значення атрибута товара", to="sw_catalog.AttributeValue", blank=True, null=True, on_delete=models.SET_NULL,
    )
    class Meta: 
        # ordering = ['order']
        verbose_name = "Колір рами" 
        verbose_name_plural = "Кольори рами"
    

class Tab(BaseMixin, NameMixin, CodeMixin, ImageMixin, FrameMixin):
    description = models.TextField(verbose_name="Опис")

    def get_tab_groups(self): 
        return TabGroup.objects.filter(is_active=True, tab=self)

    @classmethod
    def modeltranslation_fields(self):
        return super().modeltranslation_fields() + ['description']

    def __str__(self):
         return f'{self.id}.{self.name} <- {self.frame.name}'
    
    class Meta: 
        # ordering = ['order']
        verbose_name = "Вкладка"
        verbose_name_plural = "Вкладки"


class TabGroup(BaseMixin, NameMixin):
    # radio_small = 'radio_small'
    # radio_color = 'radio_color'
    # radio_img = 'radio_img'
    checkbox_options = 'checkbox_options'
    type_choices = (
        # (radio_small,"Одиночний вибір"),
        # (radio_color,"Колір"),
        # (radio_img,"Одиночний вибір з зображенням"),
        (checkbox_options,"Вибір чекбоксом"),
    )
    type      = models.CharField(verbose_name="Тип", blank=True, null=True, choices=type_choices, max_length=30)
    tab = models.ForeignKey(verbose_name="Вкладка", to="constructor.Tab", on_delete=models.SET_NULL, blank=True, null=True)

    def get_parameters(self): 
        return Parameter.objects.filter(is_active=True, tab_group=self)

    def __str__(self):
        try:
            return f'{self.id}. {self.name}  <- {self.tab.name} <- {self.tab.frame.name}'
        except:
            return f'{self.id}'
    
    class Meta: 
        # ordering = ['order']
        verbose_name = "Група"
        verbose_name_plural = "Групи"
         

class Parameter(BaseMixin, NameMixin, CodeMixin):
    radio_small      = 'radio_small'
    radio_color      = 'radio_color'
    radio_img        = 'radio_img'
    checkbox_options = 'checkbox_options'
    type_choices = (
        (radio_small,"Одиночний вибір"),
        (radio_color,"Колір"),
        (radio_img,"Одиночний вибір з зображенням"),
        (checkbox_options,"Вибір чекбоксом"),
    )
    type      = models.CharField(verbose_name="Тип", blank=True, null=True, choices=type_choices, max_length=30)
    attr = models.ForeignKey(
        verbose_name="Атрибут товару", to="sw_catalog.Attribute", on_delete=models.SET_NULL, blank=True, null=True, related_name="constructor_parameters", 
    )
    feature = models.ForeignKey(
        to="sw_catalog.Feature", verbose_name="Характеристика товару", blank=True, null=True, on_delete=models.SET_NULL, related_name="constructor_features",
    )
    tab_group = models.ForeignKey(verbose_name="Група", to="constructor.TabGroup", on_delete=models.SET_NULL, blank=True, null=True)

    def get_values(self): 
        return Value.objects.filter(is_active=True, parameter=self)

    def __str__(self):
        try:
            return f'{self.id}. {self.name} <- {self.tab_group.name} <- {self.tab_group.tab.name} <- {self.tab_group.tab.frame.name}'
        except:
            return f'{self.id}'
    
    class Meta: 
        # ordering = ['order']
        verbose_name = "Параметер групи"
        verbose_name_plural = "Параметри групи"
        unique_together = [
            'code','tab_group',
        ]


class Value(GeneralMixin):
    attr_value = models.ForeignKey(
        to="sw_catalog.AttributeValue", verbose_name="Значення атрибуту товару", blank=True, null=True, on_delete=models.SET_NULL, related_name="constructor_values", 
    )
    value = models.ForeignKey(
        to="sw_catalog.FeatureValue", verbose_name="Значення характеристики товару", blank=True, null=True, on_delete=models.SET_NULL, related_name="constructor_feature_values",
    )
    parameter = models.ForeignKey(
        verbose_name="Параметр", to="constructor.Parameter", 
        on_delete=models.SET_NULL, blank=True, null=True,
    )

    def get_children(self):
        children = Relationship.objects.filter(parent=self)
        children = children.values_list('children__id', flat=True)
        children = Value.objects.filter(id__in=children)
        return children

    def get_parents(self):
        parents = Relationship.objects.filter(children=self)
        parents = parents.values_list('parent__id', flat=True)
        parents = Value.objects.filter(id__in=parents)
        return parents
    
    def generate_children(self):
        result = {}
        for children in self.get_children():
            code = children.parameter.code
            if not result.get(code):
                result[code] = []
            result[code].append(children.code)
        return result

    def generate_children_json(self):
        result = json.dumps(self.generate_children())
        return result 

    def __str__(self):
        try:
            return f'{self.id}. {self.name} <- {self.parameter.name} <- {self.parameter.tab_group.name} <- {self.parameter.tab_group.tab.name} <- {self.parameter.tab_group.tab.frame.name}'
        except:
            return f'{self.id}'

    class Meta: 
        # ordering = ['order']
        unique_together = [
            'code','parameter',
        ]
        verbose_name = "Значення параметра"
        verbose_name_plural = "Значення параметра"


class Relationship(models.Model):
    parent   = models.ForeignKey(
        Value, related_name='parent_relationships', 
        # on_delete=models.CASCADE,
        on_delete=models.SET_NULL, blank=True, null=True,
    )

    children = models.ForeignKey(
        Value, related_name='child_relationships', 
        # on_delete=models.CASCADE,
        on_delete=models.SET_NULL, blank=True, null=True,
    )


    def __str__(self):
        return f'{self.id}.{self.parent} -> {self.children}'

    class Meta:
        verbose_name = "Звязок між елементами"
        verbose_name_plural = "Звязки між елементами"
        unique_together = [
            'parent',
            'children',
        ]


class ConstructorForm(models.Model):
    name    = models.CharField(verbose_name="Імя", blank=True, null=True, max_length=255)
    email   = models.CharField(verbose_name="Емейл", blank=True, null=True, max_length=255)
    tel     = models.CharField(verbose_name="Телефон", blank=True, null=True, max_length=255)
    message = models.TextField(verbose_name="Повідомлення", blank=True, null=True)
    values  = models.ManyToManyField(verbose_name="Вибрані елементи", to="constructor.Value", blank=True)

    def __str__(self):
        return f'{self.id}. {self.name}'
    
    class Meta:
        verbose_name = "Заявка з конструктора"
        verbose_name_plural = "Заявки з конструктора"


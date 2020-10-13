from django.core.management.base import BaseCommand
from box.apps.sw_shop.sw_catalog.models import * 


from random import choice, randrange, randint 

images = [
    'velo/atom/1.png',
    'velo/atom/2.png',
    'velo/atom/3.png',
    'velo/City/1.png',
    'velo/City/2.png',
    'velo/City/3.png',
    'velo/city_eco/1.png',
    'velo/city_eco/2.png',
    'velo/city_eco/3.png',
    'velo/lite/1.png',
    'velo/lite/2.png',
    'velo/lite/3.png',
]
manufacturers = [
    'Виробник 1',
    'Виробник 2',
    'Виробник 3',
    'Виробник 4',
]
brands = [
    'Бренд 1',
    'Бренд 2',
    'Бренд 3',
    'Бренд 4',
]
class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        FeatureCategory.objects.all().delete()
        FeatureCategory.objects.all().delete()
        FeatureValue.objects.all().delete()
        AttributeCategory.objects.all().delete()
        Attribute.objects.all().delete()
        AttributeValue.objects.all().delete()
        Item.objects.all().delete()

        for i in range(3):
            FeatureCategory.objects.get_or_create(
                name=f'Категорія характеристик {i}',
            )

        for i in range(50):
            Feature.objects.get_or_create(
                name=f'Характеристика {i}',
            )
            FeatureValue.objects.get_or_create(
                value=f'Значення характеристики {i}',
            )
            AttributeValue.objects.get_or_create(
                value=f'Значення атрибута {i}',
            )
            Attribute.objects.get_or_create(
                name=f'Атрибут {i}',
            )

        colour_category, _ = AttributeCategory.objects.get_or_create(name="Кольори")
        for i in range(5):
            attribute, _       = Attribute.objects.get_or_create(name = f'Атрибут колір {i}')
            attribute.category = colour_category
            attribute.save()
            for i in range(5):
                value, _ = AttributeValue.objects.get_or_create(
                    value=f'Значення атрибута колір {i}',
                    attribute=attribute,
                )
                value.code = "%06x" % randint(0, 0xFFFFFF)
                value.save()
        uncolor_attributes  = Attribute.objects.exclude(category=colour_category)
        color_attributes    = Attribute.objects.filter(category=colour_category)
        color_values        = AttributeValue.objects.filter(attribute__category=colour_category)
        uncolor_values      = AttributeValue.objects.exclude(attribute__category=colour_category)

        for i in range(900):
            if i > 30:
                title=f'товар без характеристик {i}'
            else:
                title = f'товар {i}'
            discount_type = choice(['v','p'])
            price         = randrange(1000,99999)
            amount        = randrange(0, 10)
            if discount_type == 'v':
                discount = randrange(0, price-1)
            elif discount_type == 'p':
                discount = randrange(0, 99) 
            item, _ = Item.objects.get_or_create(title=title)
            print(item, '/ 929')
            item.price         = price
            item.manufacturer  = ItemManufacturer.objects.get_or_create(name=choice(manufacturers))[0]
            item.brand         = ItemBrand.objects.get_or_create(title=choice(brands))[0]
            item.currency      = choice(Currency.objects.all())
            item.category      = choice(ItemCategory.objects.all())
            item.in_stock      = choice(ItemStock.objects.all())
            item.amount        = amount
            item.discount_type = discount_type
            item.discount      = discount
            item.save()

            similar_items = Item.objects.all().exclude(id=item.id)
            if similar_items.exists():
                if similar_items.count() > 5:
                    for i in range(5):
                        item.similars.add(choice(similar_items))
                else:
                    item.similars.add(choice(similar_items))
            for image in images:
                # print('****', item, item.slug)
                ItemImage.objects.get_or_create(
                    item=item,
                    image=image,
                )
            if i > 3:
                continue

            for i in range(15):
                v, _ = ItemFeature.objects.get_or_create(
                    item=item,
                    name=choice(Feature.objects.all()),
                    value=choice(FeatureValue.objects.all()),
                )
                v.category=choice(FeatureCategory.objects.all())
                v.save()

            option, _ = ItemAttribute.objects.get_or_create(
                item      = item,
                attribute = Attribute.objects.get_or_create(name='Опції')[0],
                is_option = True,
            )
            for i in range(1, 5):
                v,_ = ItemAttributeValue.objects.get_or_create(
                    item_attribute = option,
                    value = AttributeValue.objects.get_or_create(value=f'Опція {i}')[0],
                )
                v.price = randrange(0, 1000)
                v.save()

            for i in range(4):
                color_attribute, _ = ItemAttribute.objects.get_or_create(
                    item      = item,
                    attribute = choice(color_attributes),
                )
                uncolor_attribute, _ = ItemAttribute.objects.get_or_create(
                    item      = item,
                    attribute = choice(uncolor_attributes),
                )
                for j in range(4):
                    v, _ = ItemAttributeValue.objects.get_or_create(
                        item_attribute=uncolor_attribute, 
                        value=choice(uncolor_values),
                    )
                    v.price = randrange(0, 100)
                    v.save()
                    v, _ = ItemAttributeValue.objects.get_or_create(
                        item_attribute = color_attribute,
                        value=choice(color_values),
                    )
                    v.price=randrange(0, 100)
                    v.save()








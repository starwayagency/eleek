from django.template.defaultfilters import floatformat
from rest_framework import serializers
from box.apps.sw_shop.sw_cart.models import CartItem,  FavourItem, CartItemAttribute
from box.apps.sw_shop.sw_catalog.api.serializers import ItemDetailSerializer
from box.apps.sw_shop.sw_catalog.models import Item
from box.core.sw_currency.models import Currency 

class CartItemAttributeSerializer(serializers.ModelSerializer):
  class Meta:
    model = CartItemAttribute
    exclude = []


class CartItemItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Item
    fields = ['image', 'title']


class CartItemSerializer(serializers.ModelSerializer):
  item        = CartItemItemSerializer(read_only=True)
  total_price = serializers.ReadOnlyField()
  currency    = serializers.ReadOnlyField()
  attributes  = CartItemAttributeSerializer(read_only=True, many=True)
  prices      = serializers.SerializerMethodField()
  chosen_currency      = serializers.SerializerMethodField()
  
  def get_chosen_currency(self, cart_item):
    return self.context['request'].session.get('current_currency_code')

  def get_prices(self, cart_item):
    prices = {}
    # request = self.context.get('request')
    request = self.context['request']
    if request:
      query = request.query_params or request.data
      currency = None 
      currency_code = request.session.get('current_currency_code')
      if currency_code:
        currency = Currency.objects.get(code=currency_code)
      price_with_coupons_with_attributes_with_discount = floatformat(cart_item.get_price(currency, price_type='price_with_coupons_with_attributes_with_discount'), 2)
      total_price_with_coupons_with_attributes_with_discount = floatformat(cart_item.get_price(currency, price_type='total_price_with_coupons_with_attributes_with_discount'), 2)
      prices = {
        "price_with_coupons_with_attributes_with_discount":price_with_coupons_with_attributes_with_discount,
        "total_price_with_coupons_with_attributes_with_discount":total_price_with_coupons_with_attributes_with_discount,
      }
    return prices

  class Meta:
    model = CartItem
    exclude = []


class FavourItemSerializer(serializers.ModelSerializer):
  item = ItemDetailSerializer(read_only=True)
  class Meta:
    model = FavourItem
    exclude = []









import os
import json
import requests
import random
import string

from box.apps.sw_shop.sw_cart.utils import get_cart
from box.apps.sw_shop.sw_order.models import Order 
from box.apps.sw_shop.sw_cart.models import CartItem
from django.utils import timezone 
from datetime import datetime 
from .signature import generate_signature
from .models import PrivatBankPaymentSettings
from django.http import HttpResponseBadRequest


DOMAIN = os.getenv('DOMAIN')
responseUrl = str(f"{DOMAIN}/payment/installments/callback/")
# responseUrl = "https://82fc0994666c4e4587af19c959c80e46.api.mockbin.io/"
redirectUrl = str(f"{DOMAIN}/payment/installments/redirect/")


def get_order_context(request):
	cart  = get_cart(request)
	# order = Order.objects.get(
	# 	cart=cart,
	# 	ordered=False,
	# )
	  
	amount = 0 
	products = []
	  
	for cart_item in CartItem.objects.filter(cart=cart):
		amount += cart_item.total_price * cart_item.quantity
		price = cart_item.total_price
		price_full = "{:.2f}".format(price)
		product_data = {
			"name": cart_item.item.title,  
			"count": cart_item.quantity,      
			"price": price_full   
		}
		products.append(product_data)
		 
	# order_id = str(order.id)
	order_id = "axlcnkRT" 
	order_id += str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
	print(amount)
	print(products)
	return amount, products, order_id 


def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))


def create_payment(request, partsCount):
	order_data = get_order_context(request)
	total_price = order_data[0]
	amount = "{:.2f}".format(total_price)
	if float(amount) > 300000.0:
		return HttpResponseBadRequest("Сума товарів перевищує максимально допустиму")
	
	products = order_data[1]
	# order_id = order_data[2]
	order_id = generate_random_string(10)
	merchantType = str("PP")

	signature = generate_signature(order_id, products, amount, partsCount, merchantType, responseUrl, redirectUrl)
	print(signature)

	payment_settings = PrivatBankPaymentSettings.objects.first()
	storeId = str(payment_settings.store_id)

	data = {
	    "storeId": f"{storeId}",
	    "orderId": order_id,
	    "amount": amount,
	    "partsCount": partsCount,
	    "merchantType": merchantType,
	    "products": products,
	    "responseUrl": responseUrl,
	    "redirectUrl": redirectUrl,
	    "signature": signature
	}

	headers = {
	    'Accept': 'application/json',
	    'Accept-Encoding': 'UTF-8',
	    'Content-Type': 'application/json; charset=UTF-8'
	}

	# url = 'https://82fc0994666c4e4587af19c959c80e46.api.mockbin.io/'
	url = 'https://payparts2.privatbank.ua/ipp/v2/payment/create'

	response = requests.post(url, json=data, headers=headers)

	if response.status_code == 200:
		print(response.text)
		get_data = json.loads(response.text)
		try:
			if get_data['token']:
				return get_data['token']
			else:
				return None
		except KeyError:
			return None
	else:
		print(response.text)
		return None
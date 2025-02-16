import os
import json
from urllib.parse import urljoin

import requests
import random
import string

from decouple import config

from box.apps.sw_shop.sw_cart.utils import get_cart
from box.apps.sw_shop.sw_order.models import Order 
from box.apps.sw_shop.sw_cart.models import CartItem
from django.utils import timezone 
from datetime import datetime 
from .signature import generate_signature
from .models import PrivatBankPaymentSettings
from django.http import HttpResponseBadRequest
from .models import PrivateBankPartPayments
from .models import ItemPartPayment
from project.models import PaymentSettings
from project.models import DeliveryMethod


DOMAIN = config('DOMAIN')
responseUrl = str(urljoin(DOMAIN, "/payment/installments/callback/"))
# responseUrl = "https://34dd14c627024ffba4f50631d3f5af03.api.mockbin.io/"
redirectUrl = str(urljoin(DOMAIN, "/payment/installments/redirect/"))


def get_order_context(request):
	cart  = get_cart(request)
	order = Order.objects.get(
		cart=cart,
		ordered=False,
	)
	print(order)
	
	order.handle_user(request)
	order.handle_amount(request)
	order.total_price = cart.get_price(price_type='total_price')
	# self.total_price = total_price 
	# order.ordered = True
	order.save()
	cart.order = order 
	cart.ordered = True
	cart.save()

	amount = 0 
	products = []
	  
	for cart_item in CartItem.objects.filter(cart=cart):
		amount += cart_item.get_price(price_type='price_with_discount_with_attributes') * cart_item.quantity
		price = cart_item.get_price(price_type='price_with_discount_with_attributes') * cart_item.quantity
		price_full = "{:.2f}".format(price)
		product_data = {
			"name": cart_item.item.title,  
			"count": cart_item.quantity,      
			"price": price_full   
		}
		products.append(product_data)
		 
	order_id = str(order.id)
	print(products)
	return amount, products, order_id  


def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))


def create_payment(request, partsCount):
	order_data = get_order_context(request)
	print(f'ТУТ ТУТ ТУТ {order_data}')
	total_price = order_data[0]
	print(f"ТУТ {total_price}")
	amount = "{:.2f}".format(total_price)
	print(f'PRICE PRICE {amount}')
	if float(amount) > 300000.0:
		return HttpResponseBadRequest("Сума товарів перевищує максимально допустиму")
	
	products = order_data[1]
	order_id_ordinary = order_data[2]
	order_id = f"ORDER-{order_id_ordinary}.{generate_random_string(15)}"
	merchantType = str("PP")
	print(order_id)

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


def create_payment_record(order, payment_state, message):
	private_bank_payment = PrivateBankPartPayments.objects.create(
        order=order,
        payment_amount=order.total_price, 
        payment_state=payment_state,
        message=message
    )
	print(f"Payment record for {order.id} created")


def get_part_payment_for_cart(cart):
    min_payments_count = None
    max_payments_count = None
    all_available_for_installment = True

    for cart_item in CartItem.objects.filter(cart=cart):
        try:
            installment_option = ItemPartPayment.objects.get(item=cart_item.item)
            if min_payments_count is None or installment_option.min_payments_count > min_payments_count:
                min_payments_count = installment_option.min_payments_count
            if max_payments_count is None or installment_option.max_payments_count < max_payments_count:
                max_payments_count = installment_option.max_payments_count
            if not installment_option.available:
                all_available_for_installment = False
                min_payments_count = None
                max_payments_count = None
        except ItemPartPayment.DoesNotExist:
            all_available_for_installment = False
            min_payments_count = None
            max_payments_count = None
    
    return min_payments_count, max_payments_count, all_available_for_installment


def get_part_payment_context(request):
    cart = get_cart(request)
    
    amount = 0
    products = []

    for cart_item in CartItem.objects.filter(cart=cart):
        amount += cart_item.total_price * cart_item.quantity
    
    if int(amount) < 500000:
        return get_part_payment_for_cart(cart)
    else:
        return None, None, None


def get_payment_context(request):
    cart = get_cart(request)
    
    liqpay_available = True
    cash_available = True

    for cart_item in CartItem.objects.filter(cart=cart):
        item = cart_item.item
        try:
            payment_settings = PaymentSettings.objects.get(item=item)
           
            if not payment_settings.liqpay_enabled:
                liqpay_available = False
           
            if not payment_settings.cash_enabled:
                cash_available = False
        except PaymentSettings.DoesNotExist:
            pass

    return liqpay_available, cash_available


def get_delivery_context(request):
    cart = get_cart(request)
    
    nova_poshta_available = True
    pickup_available = True
    eleek_delivery_available = True

    for cart_item in CartItem.objects.filter(cart=cart):
        item = cart_item.item
        try:
            delivery_method = DeliveryMethod.objects.get(item=item)
           
            if not delivery_method.nova_poshta_enabled:
                nova_poshta_available = False
           
            if not delivery_method.pickup_enabled:
                pickup_available = False

            if not delivery_method.eleek_delivery_enabled:
                eleek_delivery_available = False
        except DeliveryMethod.DoesNotExist:
            pass

    return nova_poshta_available, pickup_available, eleek_delivery_available


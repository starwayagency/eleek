import hashlib
import base64
from .models import PrivatBankPaymentSettings


def withoutFloatingPoint(number):
    return number.replace('.', '')


def generate_products_string(products):
    products_string = ""
    for product in products:
        products_string += f"{product['name']}{product['count']}{withoutFloatingPoint(product['price'])}"
    return products_string


def generate_signature(orderId, products, amount, partsCount, merchantType, responseUrl, redirectUrl):     
    payment_settings = PrivatBankPaymentSettings.objects.first()
    password = str(payment_settings.password)
    storeId = str(payment_settings.store_id)
    pt1 = password + storeId + orderId + withoutFloatingPoint(amount) + str(partsCount) + merchantType + responseUrl + redirectUrl
    prod = generate_products_string(products)
    to_code = pt1 + prod + password 
    sha1_hash = hashlib.sha1(to_code.encode()).digest()
    base64_encoded_hash = base64.b64encode(sha1_hash)

    return base64_encoded_hash.decode()





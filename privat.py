# import base64
# import hashlib
from base64 import b64decode, b64encode
from hashlib import sha1
import json
import requests

def withoutFloatingPoint(number):
    number = str(number)
    print(number)
    if len(number.split('.')[-1]) == 1:
        number += '0'
    number = number.replace('.','')
    return number


uri             = 'https://payparts2.privatbank.ua/ipp/v2/payment/create'
password        = '75bef16bfdce4d0e9c0ad5a19b9940df'
storeId         = "4AAD1369CF734B64B70F"
orderId         = "1"
amount          = "1"
partsCount      = "10"
merchantType    = "II" # "II" | "PP" | "PB" | "IA"
responseUrl     = 'https://eleek.com.ua/sdf/'
redirectUrl     = ''
products_string = ''

signature = '' 
signature += password + storeId + orderId + withoutFloatingPoint(amount)
signature += partsCount + merchantType + responseUrl 
signature += redirectUrl + products_string + password
signature = b64encode(sha1(signature.encode('utf-8')).digest())

# print(signature)

products = [
    {
        "name": "Телевизор",
        "count": 2,
        "price": 1.00
    },
    {
        "name": "Микроволновка",
        "count": 1,
        "price": 2.00
    }
]

data = {
    "storeId": storeId,
    "orderId": orderId,
    "amount": int(amount),
    "partsCount": int(partsCount),
    "merchantType": merchantType,
    # "scheme": 1111,
    "products": products,
    # "recipientId":"qwerty1234",
    # "redirectUrl": "http://shop.com/redirect",
    "responseUrl": responseUrl,
    "signature": signature
}

response = requests.post(uri, data=data, verify=False)

print(response)





























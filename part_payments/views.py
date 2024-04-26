import json
from django.shortcuts import redirect

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import NumberPaymentsForm
from .utils import create_payment, create_payment_record
from django.http import HttpResponseBadRequest
from box.apps.sw_shop.sw_order.models import Order, OrderRecipientEmail
from box.apps.sw_shop.sw_cart.utils import get_cart
from .models import PrivateBankPartPayments
from box.core.mail import box_send_mail 
from box.core.helpers import get_admin_url
from django.contrib.sites.models import Site
from box.apps.sw_shop.sw_cart.models import Cart, CartItem


def payment_redirect(request):
    return render(request, 'project/thank_you.html', locals())


@csrf_exempt
def payment_callback(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            print("Отримано дані від привату:")
            print("orderId:", data["orderId"])
            print("paymentState:", data["paymentState"])
            
            if data["paymentState"] == "SUCCESS":
                order_id_payment = data["orderId"]
                order_id = order_id_payment.split('.')[0].split('-')[1]
                order = Order.objects.get(id=order_id)
                order.paid = True
                order.ordered = True  
                order.save()
                create_payment_record(order, data["paymentState"], data["message"])
                print(f"Order {order_id} is paid")
         
                cart = order.cart
                site = Site.objects.get_current().domain
                order_admin_url = site + get_admin_url(order)
                cart_items = CartItem.objects.filter(cart=cart)
                context = {
                  'cart_items':cart_items,
                  'order_admin_url':order_admin_url,
                }

                box_send_mail(
                  subject      = f'Отримано замовлення товарів # {order.id}',
                  template     = 'sw_order/mail.html', 
                  email_config = OrderRecipientEmail, 
                  model        = order, 
                  fail_silently= True,
                  # fail_silently= False,
                  context      = context,
                )  
            else:
                pass
            
            return HttpResponse(status=200)  
        except json.JSONDecodeError:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def payment_installments(request, count=None):
    if request.method == 'GET':
        count = request.GET.get('count')
        token = create_payment(request, count)
        if token is not None:
            payment_url = f"https://payparts2.privatbank.ua/ipp/v2/payment?token={token}"
            cart = get_cart(request)
            cart.ordered = True
            cart.save()
            return redirect(payment_url)
        else:
            return HttpResponseBadRequest("Помилка при створенні платежу: платіж платіж не був створений")
    else:
        return JsonResponse({"error": "Метод запиту не підтримується"}, status=405)


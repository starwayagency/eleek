import json
from django.shortcuts import redirect

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import NumberPaymentsForm
from .utils import create_payment
from django.http import HttpResponseBadRequest


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
            print("bankName:", data["info"]["bankName"])
            
            if data["paymentState"] == "SUCCESS":
            	print("SUCCESS")
            	pass
            else:
            	print("---")
            	pass
            
            return HttpResponse(status=200)  
        except json.JSONDecodeError:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def payment_installments(request):
	if 'partsCount' in request.GET:
		partsCount = request.GET['partsCount']
		token = create_payment(request, partsCount)
		if token != None:
			payment_url = f"https://payparts2.privatbank.ua/ipp/v2/payment?token={token}"
			return redirect(payment_url)
		else:
			return HttpResponseBadRequest("Помилка при створенні платежу: платіж не був створений")
	else:
		form = NumberPaymentsForm()
		return render(request, 'project/payment_installments.html', {'form': form})





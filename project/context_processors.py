from box.apps.sw_shop.sw_catalog.models import * 
from box.apps.sw_shop.sw_cart.utils import get_cart
from box.apps.sw_shop.sw_cart.models import CartItem
from project.models import Site as SiteSettings


def context(request):
    site = SiteSettings.objects.first()
    current_currency_code = request.session.get('current_currency_code', 'UAH')
    context = {
        "site": site,
        "current_currency_code": current_currency_code,
        'current_currency': Currency.objects.get(code=current_currency_code),
    }

    try:
        context['main_currency'] = Currency.objects.get(is_main=True)
        context['velo'] = ItemCategory.objects.get(code='velo')
        context['ramy'] = ItemCategory.objects.get(code='ramy')
        context['comp'] = ItemCategory.objects.get(code='comp')
        context['amor'] = ItemCategory.objects.get(code='amor')
        context['vilk'] = ItemCategory.objects.get(code='vilk')
        context['galm'] = ItemCategory.objects.get(code='galm')
        context['moto'] = ItemCategory.objects.get(code='moto')
        context['kole'] = ItemCategory.objects.get(code='kole')
        context['cart'] = get_cart(request)
        context['cart_items'] = CartItem.objects.filter(cart=cart)
        context['currencies'] = Currency.objects.all()
    except Exception as e:
        # raise e
        pass
    return context






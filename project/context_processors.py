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
        context['burger_categories'] = ItemCategory.objects.filter(is_displayed_on_main=True)

        other_category = ItemCategory.objects.filter(id=3).first()
        static_categories = ItemCategory.objects.filter(parent=other_category)
        cart = get_cart(request)
        context['cart'] = cart
        context['static_categories'] = static_categories
        context['cart_items'] = CartItem.objects.filter(cart=cart)
        context['currencies'] = Currency.objects.all()
    except Exception as e:
        # raise e
        pass
    return context






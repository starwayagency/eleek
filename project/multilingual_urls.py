from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render 
from django.http import HttpResponse, JsonResponse
from django.db.models import Max, Min 

from box.apps.sw_shop.sw_catalog.models import *
from box.core.sw_content.models import Page 
from box.apps.sw_shop.sw_cart.decorators import cart_exists
from box.apps.sw_shop.sw_order.models import Order
from box.apps.sw_shop.sw_order.utils import get_order_liqpay_context
from part_payments.utils import get_part_payment_context

from .models import * 


def index(request):
    page = Page.objects.get(code='index')
    test_drive_sliders = TestDriveSlider.objects.all()
    velo_sliders = VeloSlider.objects.all()
    block_ones = IndexBlockOne.objects.all()
    block_twos = IndexBlockTwo.objects.all()
    return render(request, 'project/index.html', locals())


def about(request):
    page = Page.objects.get(code='about')
    certificates = Certificate.objects.all()
    partners = Partner.objects.all()
    return render(request, 'project/about.html', locals())


def thank_you(request):
    return render(request, 'project/thank_you.html', locals())


def item_category(request, slug):
    category          = get_object_or_404(ItemCategory, slug=slug)
    page              = category 
    parent_categories = ItemCategory.objects.filter(parent__isnull=True)
    descentant_ids    = list(category.get_descendants().values_list('id', flat=True))
    descentant_ids.append(category.id)
    # items             = Item.objects.filter(category__id__in=descentant_ids).order_by('-order')[0:24]
    items             = Item.objects.filter(is_active=True, category__id__in=descentant_ids).order_by('order')[0:100]
    all_items         = Item.objects.filter(is_active=True, category__id__in=descentant_ids).order_by('order')
    show_more         = all_items.count() > 100
    # show_more         = all_items.count() > 24
    discount_filter   = all_items.filter(discount__isnull=False).exists()
    # raw_max_price     = all_items.aggregate(Max('price'))['price__max']
    # raw_min_price     = all_items.aggregate(Min('price'))['price__min']
    raw_max_price     = None
    raw_min_price     = None
    if not request.session.get('current_currency_code'):
        request.session['current_currency_code'] = 'UAH'
    current_currency_code = request.session['current_currency_code']
    current_currency = Currency.objects.get(code=current_currency_code)
    for item in all_items:
        price = item.price
        # price = item.get_price(current_currency, 'price_with_discount')
        if raw_max_price == None:
            raw_max_price = price  
        if raw_min_price == None:
            raw_min_price = price  
        if raw_max_price != None and price > raw_max_price:
            raw_max_price = price 
        if raw_min_price != None and price < raw_min_price:
            raw_min_price = price 
    max_price         = str(raw_max_price).replace(',','.')
    min_price         = str(raw_min_price).replace(',','.')
    return render(request, 'project/item_category.html', locals())


def item(request, slug):
    item = get_object_or_404(Item, slug=slug)
    odd_features = ItemFeature.objects.filter(item=item)[:10:2]
    even_features = ItemFeature.objects.filter(item=item)[1:10:2]
    page = item
    item_has_options = ItemAttribute.objects.filter(is_option=True, item=item).exists()
    reviews = ItemReview.objects.filter(item=item, is_active=True)
    return render(request, 'project/item.html', locals())


def faq(request):
    page = Page.objects.get(code='faq')
    faqs = Faq.objects.filter(is_active=True)
    return render(request, 'project/faq.html', locals())


def constructor(request):
    page = Page.objects.get(code='constructor')
    return render(request, 'project/constructor.html', locals())


def test_drive(request):
    page = Page.objects.get(code='test_drive')
    models = TestDriveModel.objects.all()
    return render(request, 'project/test_drive.html', locals())


def delivery(request):
    page = Page.objects.get(code='delivery')
    return render(request, 'project/delivery.html', locals())


@cart_exists
def order(request):
    page = Page.objects.get(code='order')
    min_payments_count, max_payments_count, all_available_for_installment = get_part_payment_context(request)

    context = {
        'min_payments_count': min_payments_count,
        'max_payments_count': max_payments_count,
        'all_available_for_installment': all_available_for_installment,
        **locals(),  
    }

    return render(request, 'project/order.html', context)


def search(request):
    page  = Page.objects.get(code='search')
    query = request.POST or request.GET
    query = query.get('main_search','')
    if query:
        search_items = Item.objects.all().filter(
            title__icontains=query,
        )
    return render(request, 'project/search.html', locals())

from box.apps.sw_shop.sw_customer.models import Coupon 

@login_required
def profile(request):
    page = Page.objects.get(code='profile')
    orders = Order.objects.filter(user=request.user)
    # coupons = Coupon.objects.all()
    # coupons = [1,2,3,4,5]
    coupons = Coupon.objects.filter(users__in=[request.user,])
    return render(request, 'project/profile.html', locals())


def shop(request):
    page = Page.objects.get(code='shop')
    return render(request, 'project/shop.html', locals())


def login(request):
    page = Page.objects.get(code='login')
    return render(request, 'project/auth/login.html', locals())


def register(request):
    page = Page.objects.get(code='register')
    return render(request, 'project/auth/register.html', locals())


def parse_request(request):
    query  = request.GET
    codes  = []
    colors = {}
    for parameter_code, value_code in query.items():
        if parameter_code not in ['iframe_type','iframe_color']:
            # Значення всіх чекбоксів
            if value_code == 'true':
                codes.append(parameter_code)
            # Значення всіх некольорів
            elif not value_code.startswith("#"):
                codes.append(value_code)
            # Значення всіх опцій
            else:
                colors.update({
                    f"{parameter_code}":value_code,
                })
    return {
        "colors":colors,
        "codes":codes,
    } 


def common_member(a, b):
    if (set(a)  & set(b)): 
        return True 
    else: 
        return False


def bike(request):
    query           = dict(request.GET)
    iframe_type     = query.pop('iframe_type')[0]
    iframe_color    = query.pop('iframe_color')[0]
    frame           = FrameType.objects.get(code=iframe_type)
    initial_price   = frame.get_initial_price()

    dict_values = []
    checkbox_values = []
    added_parameters = []
    parents = []
    for parameter_code, value_code in query.items():
        # Парсить значення з урла
        if value_code[0] == 'true':
            # Значення всіх опцій
            value = Value.objects.filter(
                parameter__tab_group__tab__frame=frame,
                code=parameter_code,
            ).first()
            parameter = value.parameter
            checkbox_values.append(value)
            parents.append(value.code)
            added_parameters.append(parameter.id)
        else:
            parameter = Parameter.objects.get(tab_group__tab__frame=frame, code=parameter_code)
            if parameter.type == 'radio_color' or value_code[0].startswith("#"):
                # Інгорує всі кольори
                value = None# value = Value.objects.filter(parameter=parameter, color=value_code[0]).first()
            else:
                # Значення всіх некольорів і неопцій
                value = Value.objects.filter(parameter=parameter, code=value_code[0]).first()
                parents.append(value.code)

        # Ігнорує значення з усіх табів крім третіх
        if parameter and value and parameter.tab_group.tab.id in [3,6,9,12] and added_parameters.count(parameter.id) < 2:
            # ???
            values = []
            for v in Value.objects.filter(parameter=parameter, is_active=True):
                value_class = ""
                if v in checkbox_values:
                    value_class = "form_box__item-active"
                elif v == value:
                    value_class = "form__radio-active"
                if v.get_parents().exists() and not common_member(v.get_parents().values_list('code', flat=True), parents):
                # if value.get_parents().exists() and not common_member(value.get_parents().values_list('code', flat=True), parents):
                    value_class = "form__radio-hiden"
                values.append({
                    "value_class":value_class,
                    "id":v.id,
                    "code":v.code,
                    "name":v.name,
                    "price":v.price,
                    "generate_children_json":v.generate_children_json(),
                    "parameter":v.parameter,
                })
            dict_values.append({
                "parameter":parameter,
                "value":value,
                "values":values,
            })
    # Якщо ???, то штучно вставляється параметр з опціями(перший і єдиний)
    if not added_parameters:
        parameter = Parameter.objects.get(tab_group__tab__frame=frame, type="checkbox_options")
        dict_values.append({
            "parameter":parameter,
            "values":Value.objects.filter(parameter=parameter, is_active=True),
        })
    return render(request, 'project/constructor/bike.html', locals())



def payment(request):
    context = get_order_liqpay_context(request)
    return render(request, 'project/payment.html', context)


def cart_items(request):
    return render(request, 'cart_items.html', locals())


def page_404(request):
    return render(request, 'page_404.html', locals())


def oferta(request):
    return render(request, 'project/oferta.html', locals())



def error_page(request):
    sdfdsa
    return render(request, 'page_404.html', locals())



from django.urls import path, include 


urlpatterns = [
    
    path('',             index,       name='index'),
    path('about/',       about,       name='about'),
    path('item_category/<slug>/',       item_category,       name='item_category'),
    path('item/<slug>/', item,        name='item'),
    path('faq/',         faq,         name='faq'),
    path('test_drive/',  test_drive,  name='test_drive'),
    path('order/',       order,       name='order'),
    path('search/',      search,      name='search'),
    path('profile/',     profile,     name='profile'),
    path('shop/',        shop,        name='shop'),
    path('delivery/',    delivery,    name='delivery'),
    path('payment/',     payment,     name='payment'),
    path('oferta/',     oferta,     name='oferta'),
    
    path('login/',      login,       name='login'),
    path('register/',   register,    name='register'),
    path('thank_you/',  thank_you,   name='thank_you'),
    path('page1/',      constructor, name='constructor'),
    path('page2/',      bike,        name='bike'),
    path('page_404/',   page_404,    name='page_404'),


    path('cart_items/', cart_items,  name='cart_items'),
    path('error_page/', error_page,  name='error_page'),

    path('', include('nova_poshta.api.urls')),

]









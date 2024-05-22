from django.utils.text import slugify
from transliterate import translit
from unidecode import unidecode


def get_cart(request):
	try:
		cart_id = request.session['cart_id']
		cart = Cart.objects.get(id=cart_id, ordered=False)
	except Exception as e:
		print(e)
		cart = Cart()
		cart.save()
		request.session['cart_id'] = cart.id
		cart = Cart.objects.get(id=cart.id, ordered=False)
	return cart


def generate_unique_slug(instance, slug_field, slug_field_value):
	items = instance._meta.model.objects.all()
	numb = 1
	slug = slugify(slug_field_value)

	while items.filter(
			**{f"{slug_field}": slug}
	).exclude(pk=instance.pk).exists():

		slug = f'{slug_field_value}-{numb}'
		numb += 1
	return slug


def handle_slug(instance, slug_field, translate_field=None, *args, **kwargs):
	slug_field_value = getattr(instance, slug_field)
	if not slug_field_value:
		if translate_field:
			translate_field_value = getattr(instance, translate_field)
			if translate_field_value:
				slug_field_value = slugify(unidecode(translate_field_value))
			else:
				slug_field_value = ""
		else:
			slug_field_value = ""
		setattr(instance, slug_field, generate_unique_slug(instance, slug_field, slug_field_value))


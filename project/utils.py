from django.utils.text import slugify
from transliterate import translit


def generate_unique_slug(instance, slug_field, slug_field_value):
	items = instance._meta.model.objects.all()
	numb = 1
	slug = slugify(slug_field_value)

	while items.filter(
			**{f"{slug_field}": slug_field_value}
	).exclude(pk=instance.pk).exists():

		slug = f'{slug_field_value}-{numb}'
		numb += 1

	return slug


def handle_slug(instance, slug_field, *args, **kwargs):
	slug_field_value = getattr(instance, slug_field)
	if not slug_field_value:
		slug_field_value = ""
	setattr(instance, slug_field, generate_unique_slug(instance, slug_field, slug_field_value))
	return instance

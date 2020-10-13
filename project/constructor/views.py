from django.http import JsonResponse
from django.core.mail import send_mail 
from django.conf import settings 

from rest_framework.decorators import api_view
from rest_framework.response import Response

import json 

from .serializers import *
from .models import *



# def generate_parents():
#   parents = []
#   return parents


def generate_values(parameter):
  result = []
  values = Value.objects.filter(is_active=True, parameter=parameter)
  for value in values:
    # children  = value.get_children()#.values_list('code', flat=True),
    # parents   = value.get_parents()#.values_list('code', flat=True),
    # children  = ValueSerializer(children, many=True).data
    # parents   = ValueSerializer(parents, many=True).data
    result.append({
      "img_value":value.image_url,
      "name":value.name,
      "price":value.price,
      "color":value.color,
      "code":value.code,
      "childrens_group":value.generate_children(),
      # "parents":generate_parents(),
    })
  return Response(result).data


def generate_parameters(tab_group):
  result = []
  parameters = Parameter.objects.filter(is_active=True, tab_group=tab_group)
  for parameter in parameters:
    result.append({
      "name":parameter.name,
      "type":parameter.type,
      "code":parameter.code,
      "values":generate_values(parameter),
    })
  return Response(result).data


def generate_groups(tab):
  result = []
  tab_groups = TabGroup.objects.filter(is_active=True, tab=tab)
  for tab_group in tab_groups:
    result.append({
      "name":tab_group.name,
      "type":tab_group.type,
      "parameters":generate_parameters(tab_group),
    }) 
  return Response(result).data


def generate_tabs(frame):
  result = {"properties":{}}
  tabs = Tab.objects.filter(is_active=True, frame=frame)
  for tab in tabs:
    result['properties'].update({
      f"tab_{list(tabs).index(tab)+1}":{
        "description":tab.description,
        "image":tab.image_url,
        "name_section":tab.name,
        "code":tab.code,
        "groups":generate_groups(tab),
      },
    })
  result['properties']['tab_1']['iframe_color'] = FrameColorSerializer(FrameColor.objects.filter(is_active=True, frame=frame), many=True).data
  return result 


@api_view(['GET', 'POST'])
def get_info(request):
  result = {}
  query = request.data or request.query_params 
  if query.get('frame_code'):
    frame = FrameType.objects.get(code=query['frame_code'])
    result = generate_tabs(frame)
    return Response(result)
  for frame_type in FrameType.objects.filter(is_active=True):
    result.update({frame_type.code:generate_tabs(frame_type)})
  return Response({
    "frames": {
      "name": "Типи рами",
      "properties": FrameTypeSerializer(FrameType.objects.filter(is_active=True), many=True).data,
    },
    "frame_type": result,
  })



@api_view(['GET','POST'])
def get_price(request):
  result = 0
  query = request.data or request.query_params
  frame = FrameType.objects.get(code=query['iframe_type'])
  result += frame.price
  # print(query)
  for parameter_code,value_code in query.items():
    if parameter_code not in ['iframe_type','iframe_color']:
      if value_code == 'true':
        value = Value.objects.filter(
          parameter__tab_group__tab__frame=frame,
          code=parameter_code,
        ).first()
        # print(value.price, value)
        result += value.price
      else:
        parameter = Parameter.objects.get(tab_group__tab__frame=frame, code=parameter_code)#.first()
        if parameter.type == 'radio_color' or value_code.startswith("#"):
          # result += Value.objects.filter(parameter=parameter,color=value_code).first().price
          pass
        else:
          # print("parameter", parameter_code)
          # print("value_code", value_code)
          value = Value.objects.get(parameter=parameter,code=value_code)
          # print(value.price, value)
          result += value.price
  return Response({
    "price":int(result)
  })


@api_view(['GET','POST'])
def make_eleek_order(request):
  query   = request.data or request.query_params 
  print(query)
  # values  = query['values']
  name    = query.get('name','-----')
  email   = query.get('email','-----')
  tel     = query.get('tel','-----')
  message = query.get('message','-----')
  model = ConstructorForm.objects.create(
    name=name,
    email=email,
    tel=tel,
    message=message,
  )
  '''
  sdf@sdf.sdf11111111111111
  '''
  price = 0
  values = ""
  frame = FrameType.objects.get(code=query['iframe_type'])
  color = query['iframe_color']
  # for k, v in query.items():
  #   print(k)
  #   print(v)
  #   print()
  frame_color = FrameColor.objects.get(frame=frame,color=color)
  # try:
  #   frame_color = FrameColor.objects.get(frame=frame,color=color)
  # except:
  #   frame_color = FrameColor.objects.all().first()
  for parameter_code, value_code in query.items():
    if parameter_code not in ["iframe_type", "iframe_color", 'name', 'email', 'tel', 'message']:
      if value_code == "true":
        value = Value.objects.get(parameter__tab_group__tab__frame=frame, code=parameter_code)
        price += value.price
        parameter = value.parameter
      else:
        parameter = Parameter.objects.get(tab_group__tab__frame=frame, code=parameter_code)
        if value_code.startswith("#") and value_code != '#None':
          value = Value.objects.get(color=value_code,parameter=parameter, is_active=True)
          price += value.price
        else:
          value = Value.objects.get(code=value_code,parameter=parameter, is_active=True)
          price += value.price
      values += f"""
      {parameter.name}:{value.name}
      """
  price += frame.price
  send_mail(
    subject=f"Заявка з конструктора №{model.id}",
    message=f""" 
      Імя:{name};
      Емейл:{email};
      Телефон:{tel};
      Повідомлення:{message};
      Рама:{frame.name};
      Ціна:{price};
      Значення:{values}
    """,
    from_email=settings.DEFAULT_FROM_EMAIL,
    recipient_list=settings.DEFAULT_RECIPIENT_LIST,
    fail_silently=False,
  )
  return Response({
    "status":"OK",
    "price":price,
  })


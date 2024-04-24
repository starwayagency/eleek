from django.http import JsonResponse, HttpResponse 
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.contrib.auth import (authenticate, get_user_model, login, logout)
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse 
from django.contrib import messages 
from django.utils.translation import gettext_lazy as _


from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import viewsets


from .serializers import *
from .. import settings as auth_settings 


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.user.is_anonymous:
            return get_user_model().objects.none()
        queryset = get_user_model().objects.filter(id=self.request.user.id)
        return queryset

    def update(self, request, *args, **kwargs):
        user     = self.get_object()
        if 'password' in request.data \
        and 'password2' in request.data \
        and 'old_password' in request.data:
            password     = request.data.get('password')
            password2    = request.data.get('password2')
            old_password = request.data.get('old_password')
            if password and password2 and password != password2:
                return JsonResponse({
                    'status':'BAD',
                    "error_fields":{
                        "password":_('Паролі не співпадаюсь'),
                        'password2':_('Паролі не співпадаюсь'),
                    }
                }) 
            if old_password and not user.check_password(old_password):
                return JsonResponse({
                    'error_fields':{
                        'old_password':_('Неправильний старий пароль'),
                    },
                    'status':'BAD',
                })
            if password:
                # import pdb; pdb.set_trace()
                print('new password in update user',password)
                user.set_password(password)
                user.save()
        result = super().update(request, *args, **kwargs)
        result.data['status'] = 'OK'
        return result

    def create(self, request, *args, **kwargs):
        query       = request.data
        email       = query['email']
        username    = query.get('username') or email.split('@')[0]
        password    = query['password']
        password2   = query['password2']
        first_name  = query.get('first_name','')
        last_name   = query.get('last_name','')
        phone_number= query.get('phone_number', '')
        email_qs    = get_user_model().objects.filter(email=email)
        username_qs = get_user_model().objects.filter(username=username)

        if password and password2 and password != password2:
            return JsonResponse({
                'status':'BAD',
                "error_fields":{
                    "password":_('Паролі не співпадаюсь'),
                    'password2':_('Паролі не співпадаюсь'),
                }
            }) 
        if email_qs.exists() and email != '' and username_qs.exists() and username != '':
            return JsonResponse({
                'status':'BAD',
                "error_fields":{

                    "email":_("Цей емейл вже зайнятий"), 
                    'username': _("Цей логін вже зайнятий"),
                },
            }) 
        if email_qs.exists() and email != '':
            return JsonResponse({
                'status':'BAD',
                "error_fields":{
                    "email":_('Цей емайл вже зайнятий'),
                },
            })
        if username_qs.exists() and username != '':
            return JsonResponse({
                'status':'BAD',
                "error_fields":{

                    "username":_('Цей логін вже зайнятий'),
                },
            })
        user = get_user_model().objects.create_user(
            username     = username,
            email        = email, 
            first_name   = first_name, 
            last_name    = last_name, 
            phone_number = phone_number,
        )

        user.set_password(password)
        user.is_active = True 
        user.save()
        new_user = authenticate(username=user.username, password=password)
        login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')
        return JsonResponse({
            'status':'OK',
            'url':reverse(auth_settings.REGISTER_REDIRECT_URL),
        })


def current_user_info(request):
    return JsonResponse(UserSerializer(request.user, many=False).data, safe=False)


@csrf_exempt 
def sw_login(request):
    query = request.POST or request.GET
    print(query)
    # response    = redirect(request.META['HTTP_REFERER'])
    password    = query['password']
    username    = query.get('username') or query.get('email').split('@')[0]
    email       = query.get('email')
    remember_me = request.GET.get('remember_me')

    if remember_me == "true":
        pass
    else:
        request.session.set_expiry(0)
    
    users = get_user_model().objects.filter(
        Q(username__iexact=username)|
        Q(email__iexact=email)
    ).distinct() 

    if not users.exists() and users.count() != 1:
        return JsonResponse({
            'error_fields':{
                'email':_("'Такого користувача не існує'"),
                'username':_("'Такого користувача не існує'"),
            },
            'status':'BAD',
        })
    user = users.first() 
    if not user.check_password(password):
        return JsonResponse({
            'error_fields':{
                'password':_('Неправильний пароль'),
            },
            'status':'BAD',
        })
    if not user.is_active:
        return JsonResponse({
            'message':_('Цей користувач неактивний'),
            'status':'BAD',
        })
    user = authenticate(username=user.username, password=password)
    # if user is not None:
    #     if user.is_active:
    #         login(request, user)
    #         return JsonResponse('fine')
    #     else:
    #         return JsonResponse('inactive')
    # else:
    #     return JsonResponse('bad')
    login(request, user)
    return JsonResponse({
        'status':'OK',
        'message':_('Ви увійшли'),
        'url':reverse(auth_settings.LOGIN_REDIRECT_URL),
    })


@csrf_exempt 
def sw_logout(request):
    logout(request)
    return JsonResponse({
        'status':'OK',
        'url':reverse(auth_settings.LOGOUT_REDIRECT_URL),
    })

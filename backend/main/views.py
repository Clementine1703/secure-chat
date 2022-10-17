from django.shortcuts import render, HttpResponse
from main.models import Categories
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from main.serializers import CategoriesSerializer, UserSerializer


def index(request):
    return HttpResponse('111')


class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

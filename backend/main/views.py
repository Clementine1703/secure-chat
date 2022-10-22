from django.shortcuts import render, HttpResponse
from main.models import AdditionalUserData
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from main.serializers import AdditionalUserDataSerializer


def index(request):
    return HttpResponse('111')


class AdditionalUserDataViewSet(viewsets.ModelViewSet):
    queryset = AdditionalUserData.objects.all()
    serializer_class = AdditionalUserDataSerializer
#     permissions_classes = [permissions.IsAuthenticated]



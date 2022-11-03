from django.shortcuts import render, HttpResponse
from main.models import AdditionalUserData
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from main.serializers import AdditionalUserDataSerializer


def index(request):
    return HttpResponse('111')


class AdditionalUserDataViewSet(APIView):
    def get(self, request):
        data = AdditionalUserData.objects.filter(user_id=request.user.id)
        if not data:
            AdditionalUserData.objects.create(user_id=request.user.id)
            data = AdditionalUserData.objects.filter(user_id=request.user.id)
        return Response({'user_data': AdditionalUserDataSerializer(data, many=True).data})
    def post(self, request):
        serializer = AdditionalUserDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_data, created = AdditionalUserData.objects.update_or_create(user_id=request.user.id, defaults={
            'name': request.data['name'],
            'user_id': request.user.id,
            'user_status': request.data['user_status'],
            'sex': request.data['sex'],
            'experience': request.data['experience'],
            'date_of_birth': request.data['date_of_birth'],
        })
        return Response({'user_data': AdditionalUserDataSerializer(new_data).data})




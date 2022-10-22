from main.models import AdditionalUserData
from django.contrib.auth.models import User
from rest_framework import serializers


class AdditionalUserDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AdditionalUserData
        fields = ['name']



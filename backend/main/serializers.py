from main.models import AdditionalUserData, Chat, ChatUser, Message
from django.contrib.auth.models import User
from rest_framework import serializers


class AdditionalUserDataSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=60,read_only=True)
    user_status = serializers.CharField(read_only=True)
    date_of_birth = serializers.DateField(read_only=True)
    date_of_registration = serializers.DateTimeField(read_only=True)
    experience = serializers.CharField(max_length=2,read_only=True)
    sex = serializers.CharField(max_length=2,read_only=True)


class UsersSearchDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

class ChatUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatUser
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'



# class AdditionalUserDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AdditionalUserData
#         fields = ('user_id', 'name', 'user_status', 'date_of_birth', 'date_of_registration', 'experience', 'sex', )





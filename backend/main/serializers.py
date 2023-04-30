from main.models import AdditionalUserData, Chat, ChatUser, Message, FriendRequest, Friend
from django.contrib.auth.models import User
from rest_framework import serializers


class AdditionalUserDataSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=60,read_only=True)
    status = serializers.CharField(read_only=True)
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

class FriendRequestSerializer(serializers.ModelSerializer):
    recipient = serializers.CharField(source='recipient.username')
    sender = serializers.CharField(source='sender.username')
    class Meta:
        model = FriendRequest
        fields = '__all__'

class FriendSerializer(serializers.ModelSerializer):
    # user = serializers.CharField(source='user.username')
    friend = serializers.CharField(source='friend.username')
    class Meta:
        model = Friend
        fields = ['friend']

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    you_read = serializers.BooleanField(default=False, read_only=True)
    class Meta:
        model = Message
        fields = '__all__'

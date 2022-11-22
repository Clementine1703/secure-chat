from django.shortcuts import render, HttpResponse
from main.models import AdditionalUserData, Chat, ChatUser, Message
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from main.serializers import AdditionalUserDataSerializer, UsersSearchDataSerializer, ChatSerializer, ChatUserSerializer, MessageSerializer


def index(request):
    return HttpResponse('111')


class UsersSearchViewSet(APIView):
    def post(self, request):
        data = User.objects.filter(username__startswith=request.data['value']).exclude(id=request.user.id)
        return Response({'response': UsersSearchDataSerializer(data, many=True).data})

class ChatViewSet(APIView):
    def get(self, request):
        chats = ChatUser.objects.filter(user_id=request.user.id)
        chats = [i.chat for i in chats]
        return(Response(ChatSerializer(chats, many=True).data))

class MessageViewSet(APIView):
    def post(self, request):
        users = []
        for element in ChatUser.objects.filter(chat_id=request.data['chat_id']):
            users.append({'username': element.user.username, 'user': element.user.id})


        if (request.data['check_updates']):
            messages = Message.objects.filter(chat_id=request.data['chat_id'], read=False).exclude(user = User.objects.get(id=request.user.id))
            for message in messages:
                message.read = True
                message.save()
        else:
            messages = Message.objects.filter(chat_id=request.data['chat_id'])
        
        # Добавляем поле username в сообщение
        # for


        return(Response({'messages': MessageSerializer(messages, many=True).data, 'your_id': request.user.id, 'users': users}))

class NewMessageViewSet(APIView):
    def post(self, request):
        print(request.data)
        message = Message(chat_id=request.data['chat_id'], content=request.data['content'], user_id=request.user.id, read=False)
        message.save()
        return Response(MessageSerializer(message).data)


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




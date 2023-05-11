from main.models import AdditionalUserData, Chat, ChatUser, Message, UserReadedMessage, UserReceivedMessage, FriendRequest, Friend
from django.contrib.auth.models import User
from main.services.views.services import *
from rest_framework.response import Response
from rest_framework.views import APIView
from main.serializers import AdditionalUserDataSerializer, UsersSearchDataSerializer, ChatSerializer, ChatUserSerializer, MessageSerializer, FriendRequestSerializer, FriendSerializer


# поиск пользователей
class UsersSearchViewSet(APIView):
    def post(self, request):
        return get_users_by_string(request)


# поиск чатов
class ChatViewSet(APIView):
    def post(self, request):
        return get_chat_by_string(request)


class MessageViewSet(APIView):
    def post(self, request):
        try:
            messages = get_all_messages(request)
            # перебираем сообщения и записываем какие конкретно этот юзер прочитал, а какие - нет для корректного отображения на фронте
            messages = sort_messages_into_read_and_unread_before_sending(request, messages)
            return (Response({'messages': MessageSerializer(messages, many=True).data, 'me': request.user.username}))
        except MessagesException as e:
            return (Response({'error': e.txt}))


class NewMessageViewSet(APIView):
    def post(self, request):
        return create_new_message(request)


class ReadMessageViewSet(APIView):
    def post(self, request):
        return mark_that_user_readed_message(request)


class FriendRequestViewSet(APIView):
    def post(self, request):
        username = request.data['username']
        # Если мы передавали юзернэйм, то отправляем заявку
        if username:
            return send_friendship_request(request)
        # Иначе получаем все заявки адресованные нам
        else:
            return get_friendship_requests_addressed_to_us(request)


class FriendViewSet(APIView):
    def post(self, request):
        # принимаем заявку
        return accept_a_friendship_request(request)
    def get(self, request):
        return get_friends_list(request)


class RemoveFriendViewSet(APIView):
    def post(self, request):
        return remove_from_friends_list(request)



class AdditionalUserDataViewSet(APIView):
    def get(self, request):
        return get_user_data(request)

    def post(self, request):
        return change_user_data(request)
    







# class JWTTest(APIView):
#     def get(self, request):
#         print(request.__dict__)
#         a = JWTAuthentication()
#         print(a.authenticate(request))
#         return Response('ok') 

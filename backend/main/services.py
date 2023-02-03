from rest_framework.response import Response
from django.contrib.auth.models import User
from main.serializers import AdditionalUserDataSerializer, UsersSearchDataSerializer, ChatSerializer, ChatUserSerializer, MessageSerializer, FriendRequestSerializer, FriendSerializer
from main.models import AdditionalUserData, Chat, ChatUser, Message, UserReadedMessage, UserReceivedMessage, FriendRequest, Friend


def get_users_by_string(request):
    data = User.objects.filter(
        username__startswith=request.data['value']).exclude(id=request.user.id)
    return Response({'response': UsersSearchDataSerializer(data, many=True).data})


def get_chat_by_string(request):
    chat_name = request.data['chat_name']
    chats = ChatUser.objects.filter(user_id=request.user.id)
    chats = [i.chat for i in chats if i.chat.name.startswith(chat_name)]

    return (Response(ChatSerializer(chats, many=True).data))


def get_not_read_messages(request):
    messages = Message.objects.filter(chat_id=request.data['chat_id'], read=False).exclude(
        user=User.objects.get(id=request.user.id))
    # в момент получения сообщения помечаем его как "прочитанное", чтобы больше не получать его при подобном запросе (временно)
    for message in messages:
        message.read = True
        message.save()
    return messages


def get_all_messages(request):
    messages = Message.objects.filter(chat_id=request.data['chat_id'])
    return messages


def mark_messages_read_by_user(request, messages):
    for message in messages:
        print(message.message_id)
        readed = UserReadedMessage.objects.filter(
            message_id=message.message_id, user=request.user)
        if readed or message.user == request.user:
            message.you_read = True
        else:
            message.you_read = False
    return messages


def create_new_message(request):
    message = Message(
        chat_id=request.data['chat_id'], content=request.data['content'], user_id=request.user.id, read=False)
    message.save()
    return Response(MessageSerializer(message).data)


def mark_that_user_readed_message(request):
    user, created = UserReadedMessage.objects.get_or_create(
        message_id=request.data['message_id'], user=request.user)

    return Response({'readed': created})


def get_user_data(request):
    data = AdditionalUserData.objects.filter(user_id=request.user.id)
    if not data:
        AdditionalUserData.objects.create(user_id=request.user.id)
        data = AdditionalUserData.objects.filter(user_id=request.user.id)
    return Response({'user_data': AdditionalUserDataSerializer(data, many=True).data})


def send_friendship_request(request):
    recipients_list = User.objects.filter(username=username)
    if (recipients_list):
        recipient = recipients_list[0]
        sender = request.user
        # проверка являются ли уже друзьями пользователи
        error_check = Friend.objects.filter(
            user=recipient, friend=sender)
        if error_check:
            return Response({'status': 'error', 'message': 'Вы уже являетесь друзьями'})
        friend_request, created = FriendRequest.objects.update_or_create(
            recipient=recipient, sender=sender)
        return Response({'status': 'ok', 'data': FriendRequestSerializer(friend_request).data})
    else:
        return Response({'status': 'error', "message": 'Пользователь не найден'})


def get_friendship_requests_addressed_to_us(request):
    friends_requests = FriendRequest.objects.filter(
        recipient=request.user)
    if friends_requests:
        return Response(FriendRequestSerializer(friends_requests, many=True).data)
    return Response({'status': 'empty'})


def get_friends_list(request):
    friends = Friend.objects.filter(user=request.user)
    return Response(FriendSerializer(friends, many=True).data)


def accept_a_friendship_request(request):
    accepted_request = FriendRequest.objects.filter(id=request.data['id'])
    if accepted_request:
        accepted_request[0].delete()
        user1 = accepted_request[0].recipient
        user2 = accepted_request[0].sender
        print(user1.id)
        print(user2.id)
        friend, created = Friend.objects.update_or_create(
            user=user1, friend=user2)
        friend.save()
        friend, created = Friend.objects.update_or_create(
            user=user2, friend=user1)
        friend.save()
        # Создаем чат, если он еще не был создан и добавляем в него пользователей
        chat, created = Chat.objects.update_or_create(
            name=f'{user1.username} и {user2.username}')
        chat.save()
        if created:
            chat_user = ChatUser(user=user1, chat=chat)
            chat_user.save()
            chat_user = ChatUser(user=user2, chat=chat)
            chat_user.save()

        return Response({'ok': True, 'friend': FriendSerializer(friend).data})
    else:
        return Response({'ok': False, 'status': 'friends request not found'})


def remove_from_friends_list(request):
    id = request.data['id']
    friend_to_delete = Friend.objects.filter(id=id)
    if friend_to_delete:
        friendship = Friend.objects.filter(
            user=friend_to_delete[0].user, friend=friend_to_delete[0].friend).delete()
        friendship = Friend.objects.filter(
            user=friend_to_delete[0].friend, friend=friend_to_delete[0].user).delete()
        return Response({'status': 'ok'})
    return Response({'status': 'error', 'message': 'Пользователь не найден'})


def change_user_data(request):
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

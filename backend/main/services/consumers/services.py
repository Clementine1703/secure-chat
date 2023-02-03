from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from asgiref.sync import async_to_sync
import json


def ws_authentication(consumer):
    # self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
    # self.room_group_name = "chat_%s" % self.room_name

    # # Join room group
    # async_to_sync(self.channel_layer.group_add)(
    #     self.room_group_name, self.channel_name
    # )

    str_token = consumer.scope['query_string'].decode('ascii').split('=')[-1]
    model_token = Token.objects.filter(key=str_token)
    if (model_token):
        consumer.user = model_token[0].user
        consumer.accept()
        consumer.send(text_data=json.dumps({"message": consumer.channel_name}))

        # Вступаем  в группу
        async_to_sync(consumer.channel_layer.group_add)(
            consumer.user.group_id, consumer.channel_name
        )


def ws_leave_the_group(consumer):
    try:
        async_to_sync(consumer.channel_layer.group_discard)(
            consumer.user.group_id, consumer.channel_name
        )
    except AttributeError: 
        pass

def ws_friend_handler(consumer, request):
    print(request, 'AAAAAAAAAAAAAAA')
    data = request['data']
    user = User.objects.filter(username=data['username'])[0]
    group_id = user.group_id

    data = {
        'username': consumer.user.username
    }
    async_to_sync(consumer.channel_layer.group_send)(
        group_id, {"type": "send_data",
                   "message": json.dumps({'request': request, 'data': data})}
    )


def ws_send_friendship_request():
    pass


def ws_send_message():
    pass


def ws_remove_message():
    pass

# chat/consumers.py
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from main.serializers import UsersSearchDataSerializer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        # self.room_group_name = "chat_%s" % self.room_name

        # # Join room group
        # async_to_sync(self.channel_layer.group_add)(
        #     self.room_group_name, self.channel_name
        # )


         
        str_token = self.scope['query_string'].decode('ascii').split('=')[-1]
        model_token = Token.objects.filter(key=str_token)
        if (model_token):
            self.user = model_token[0].user
            self.accept()
            self.send(text_data=json.dumps({"message": self.channel_name}))
            print(self.channel_layer)

            #Вступаем  в группу
            async_to_sync(self.channel_layer.group_add)(
            'user_1', self.channel_name
        )
        

    
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            'user_1', self.channel_name
        )

    # Receive message from WebSocket
    
    def receive(self, text_data):
        data = json.loads(text_data)
        # self.send(text_data=json.dumps({"message": data}))

        if (data['type'] == 'friend' and data['action'] == 'send_request'):
            username = data['target']
            user = User.objects.filter(username=username)[0]
            serialized_user = UsersSearchDataSerializer(user).data

            async_to_sync(self.channel_layer.group_send)(
            'user_1', {"type": "friends_request", "message": f'Вас добавил в друзья {serialized_user}'}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]
        print(message)

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))

    def friends_request(self, event):
        message = event["message"]
        print(message)

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))
# chat/consumers.py
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


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
            self.send(text_data=json.dumps({"message": self.user.group_id}))
        

    
    def disconnect(self, close_code):
        pass
        # Leave room group
        # async_to_sync(self.channel_layer.group_discard)(
        #     self.room_group_name, self.channel_name
        # )

    # Receive message from WebSocket
    
    def receive(self, text_data):
        text_data_json = text_data
        print(self.user)
        self.send(text_data=json.dumps({"message": text_data_json}))
        print('click')
        # message = text_data_json["message"]

        # # Send message to room group
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name, {"type": "chat_message", "message": message}
        # )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))
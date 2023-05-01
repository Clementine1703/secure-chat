# chat/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from main.serializers import UsersSearchDataSerializer
from main.services.consumers.services import *

#       ACCEPTED COMMANDS:
# {
#     friend:['add', 'remove', 'send_request'],
#     message:['send', 'remove'],
    # chat:['connect', ''],
# }


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        ws_authentication(self)

    def disconnect(self, close_code):
        ws_leave_the_group(self)

    # Receive message from WebSocket

    def receive(self, text_data):
        request = json.loads(text_data)

        if (request['type'] == 'friend'):
            ws_friend_handler(self, request)

        if (request['type'] == 'message'):
            ws_message_handler(self, request)

        if (request['type'] == 'chat' and request['action'] == 'connect'):
            ws_connect_to_chat(self, request)
            print(request['data'])



    # Receive message from room group

    def send_data(self, event):
        message = json.loads(event["message"])
        print(message)

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))

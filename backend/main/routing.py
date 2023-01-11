# chat/routing.py
from django.urls import path, re_path

from . import consumers

websocket_urlpatterns = [
    path("chat/", consumers.ChatConsumer.as_asgi()),
]
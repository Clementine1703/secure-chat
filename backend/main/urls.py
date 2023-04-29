from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers
from main import views

# router = routers.DefaultRouter()
# router.register(r'categories', views.AdditionalUserDataViewSet)

urlpatterns = [
    path('api/', views.AdditionalUserDataViewSet.as_view()),
    path('api/profiles/', views.UsersSearchViewSet.as_view()),
    path('api/chat/get', views.ChatViewSet.as_view()),
    path('api/message/get', views.MessageViewSet.as_view()),
    path('api/message/post', views.NewMessageViewSet.as_view()),
    path('api/message/read', views.ReadMessageViewSet.as_view()),
    path('api/friends/newrequest', views.FriendRequestViewSet.as_view()),
    path('api/friends/accept', views.FriendViewSet.as_view()),
    path('api/friends/remove', views.RemoveFriendViewSet.as_view()),
    # path('api/jwt', views.JWTTest.as_view()),

    # path('api/', include(router.urls)),
#     path('api/', include('rest_framework.urls', namespace='rest_framework'))
]

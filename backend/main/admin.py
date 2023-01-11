from django.contrib import admin
from .models import AdditionalUserData, ChatUser, Chat, Message, Friend, FriendRequest


@admin.register(AdditionalUserData)
class AdditionalUserDataAdmin(admin.ModelAdmin):
    list_display = ['user', 'name' , 'experience']

@admin.register(Chat)
class ListOfChatGroupsAdmin(admin.ModelAdmin):
    pass

@admin.register(ChatUser)
class ChatParticipantListsAdmin(admin.ModelAdmin):
    pass

@admin.register(Message)
class MessageListsAdmin(admin.ModelAdmin):
    pass

@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    pass

@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    pass


from django.contrib import admin
from .models import AdditionalUserData, ChatUser, Chat, Message


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


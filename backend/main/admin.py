from django.contrib import admin
from .models import AdditionalUserData


@admin.register(AdditionalUserData)
class AdditionalUserDataAdmin(admin.ModelAdmin):
    list_display = ['user', 'name' , 'experience']

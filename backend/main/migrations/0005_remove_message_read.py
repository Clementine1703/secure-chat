# Generated by Django 4.1.2 on 2023-05-01 10:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_rename_user_status_additionaluserdata_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='read',
        ),
    ]

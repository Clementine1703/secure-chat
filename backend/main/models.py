from django.db import models
from django.contrib.auth.models import User


class AdditionalUserData(models.Model):
    JUNIOR = 'JR'
    MIDDLE = 'ML'
    SENIOR = 'SR'
    EXPERIENCE_CHOICES = [
        (JUNIOR, 'Junior'),
        (MIDDLE, 'Middle'),
        (SENIOR, 'Senior'),
    ]
    MALE = 'ML'
    FEMALE = 'FL'
    SEX_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name = 'Пользователь')
    name = models.CharField(max_length=60, verbose_name = 'Имя', blank=True)
    user_status = models.CharField(max_length=150, verbose_name = 'Статус', blank=True)
    date_of_birth = models.DateField( null=True ,verbose_name = 'Дата рождения', blank=True)
    date_of_registration = models.DateTimeField(auto_now_add = True, verbose_name = 'Дата регистрации')
    experience = models.CharField(
                         max_length=2,
                         choices=EXPERIENCE_CHOICES,
                         default=JUNIOR,
                         verbose_name = 'Опыт',
                         blank=True)
    sex = models.CharField(max_length=2, choices=SEX_CHOICES, blank=True, null=True, verbose_name='Гендер');

    class Meta:
        verbose_name = 'Данные пользователя'
        verbose_name_plural = "Данные пользователей"

    def __str__(self):
        return 'Данные'

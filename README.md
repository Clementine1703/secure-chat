# secure-chat
Дипломный проект, сайт для обмена сообщениями и поиска друзей.
Для корректной работы нужно зайти в env/lib/pythonVx/contrib/auth/models.py

и добавить модели User 
    @property
    def group_id(self):
        # 'calculation' return a boolean
        return f'group_{self.id}'

в противном случае вебсокеты не будут работать, а соответственно и все остальное

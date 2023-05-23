# secure-chat
Дипломный проект, сайт для обмена сообщениями и поиска друзей.<br>
Для корректной работы нужно зайти в env/lib/pythonVx/contrib/auth/models.py<br><br>

и добавить модели User <br>
    @property<br>
    def group_id(self):<br>
        # 'calculation' return a boolean<br>
        return f'group_{self.id}'<br><br>

в противном случае вебсокеты не будут работать, а соответственно и все остальное

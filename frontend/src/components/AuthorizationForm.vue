<template>
	<form class="form shadow-lg rounded bg-white mt-5 px-5 py-4 mx-auto" action="#" @submit.prevent='sign_in()'>
      <h1 class="mb-4 text-center">Вход</h1>
      <div class="form-group my-3">
        <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Введите почту">
      </div>
      <div class="form-group my-3">
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Пароль">
      </div>
      <div class="form-check my-2">
        <input type="checkbox" class="checkbox form-check-input" id="exampleCheck1" required>
        <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
      </div>
      <button type="submit" class="reg-button text-white">Отправить</button>
      <small class="text-center">Нет аккаунта?
        <router-link :to="{name: 'registration'}">
          <span class="sign-up-link">Зарегистрировать</span>
        </router-link>
      </small>
    <br>
    <small>{{ status_info }}</small>
    </form>
</template>

<script>

export default {
	name: 'AuthorizationForm',
	components: {
	},
	data() {
		return {
			email: '',
      password: '',
      status_info: '',
		}
	},
	methods: {
		sign_in() {
      var axios = require('axios');
      // var FormData = require('form-data');
      // var data = new FormData();

      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/auth/token/login/',
        mode:'cors',
        // headers: {
          // ...data.getHeaders()
        // },
        data : {
          'username': this.email,
          'password': this.password,
        }
      };


      axios(config)
          .then((response) => {
            this.$store.state.status.auth = true;
            this.$store.state.status.auth_token = response.data.auth_token;
            this.status_info = this.$store.state.status.auth_token;
          })
          .catch((error) => {
            this.status_info = error.response.data;
          });
		},
	}

}
</script>

<style scoped>

.form {
	width: 400px;
	height: 400px;
}

.checkbox{
  background-color: #64B687;
}

.checkbox:checked, .checkbox:active, .checkbox:focus-visible{
  border: none;
  outline: none;
  box-shadow: none;
  background-color: #64B687;
}

.form-check-label{
  color: #64B687;
}

.reg-button{
  background-color: #64B687;
  border: none;
  outline: none;
  box-shadow: none;
  padding: 10px 20px;
  transition: 0.5s ease;
  border-radius: 5px;
  width: 100%;
}

.reg-button:hover{
  background-color: #4F775C;

}

.sign-up-link{
  color: #64B687;
}

small{
  width: 100%;
}
</style>

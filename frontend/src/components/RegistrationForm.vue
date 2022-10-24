<template>
  <form class="form shadow-lg rounded bg-white mt-5 px-5 py-4 mx-auto" action="#" @submit.prevent='register()'>
    <standart-preloader v-if = 'loading' ></standart-preloader>
    <h1 class="mb-4 text-center">Регистрация</h1>
    <div class="form-group my-3">
      <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Введите почту">
    </div>
    <div class="form-group my-3">
      <input v-model="password" type="password" class="form-control" id="password" placeholder="Пароль">
    </div>
    <div class="form-check my-2">
      <input type="checkbox" class="checkbox form-check-input" id="exampleCheck1" required>
      <label class="form-check-label" for="exampleCheck1">Я не робот</label>
    </div>
    <button type="submit" class="reg-button text-white">Отправить</button>
    <small class="text-center">Есть аккаунт?
      <router-link :to="{name: 'authentication'}">
        <span class="sign-up-link">Войти</span>
      </router-link>
    </small>
    <br>
    <small> {{ status_info }} </small>
  </form>
</template>

<script>
import StandartPreloader from "@/assets/widgets/StandartPreloader";

export default {
	name: 'RegistrationForm',
  components:{
    StandartPreloader,
  },
  data() {
		return {
			email: '',
      password: '',
      status_info: '',
      loading: false,
		}
	},
	methods: {
		register() {
      this.loading = true;
      var axios = require('axios');
      // var FormData = require('form-data');
      // var data = new FormData();

      var config = {
        method: 'post',
        url: `${this.$store.state.base_url}/auth/users/`,
        mode:'cors',
        // headers: {
          // ...data.getHeaders()
        // },
        data : {
          'username': this.email,
          'password': this.password,
          'email': this.email,
        }
      };


      axios(config)
          .then((response) => {
            if(JSON.stringify(response.status) === '201'){
              this.status_info = 'Вы успешно зарегистрировались!';
              setTimeout(()=>{
                this.$router.push({name: 'authentication'});
              }, 3000)

            }


          })
          .catch((error) => {
            this.status_info = error.response.data;
          })
          .finally(()=>{
            this.loading = false;
          });
		},
	},
  mounted() {
    if (this.$store.state.status.auth){
      this.$router.push({name: 'main'});
    }
  }

}
</script>

<style scoped>
.form {
  width: 400px;
  height: 400px;
  position: relative;
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

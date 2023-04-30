<template>
  <form class="form shadow-lg rounded bg-white mt-5 px-5 py-4 mx-auto" action="#"
    @submit.prevent='register(email, password)'>
    <standart-preloader v-if='preloader'></standart-preloader>
    <h1 class="mb-4 text-center">Регистрация</h1>
    <div class="form-group my-3">
      <input v-model="email" type="text" class="form-control" id="email" aria-describedby="emailHelp"
        placeholder="Введите почту">
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
      <router-link :to="{ name: 'authentication' }">
        <span class="sign-up-link">Войти</span>
      </router-link>
    </small>
    <br>
    <small> {{ status_info }} </small>
  </form>
</template>

<script>
import StandartPreloader from "@/assets/widgets/StandartPreloader";
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'RegistrationForm',
  components: {
    StandartPreloader,
  },
  data() {
    return {
      email: '',
      password: '',
      status_info: '',
      preloader: false,
    }
  },
  computed: {
    ...mapGetters(['GET_AUTH_TOKEN']),
  },
  methods: {
    ...mapActions(['SEND_A_USER_REGISTRATION_REQUEST_TO_THE_API', 'REDIRECT_TO_THE_PAGE']),

    enable_preloader() {
      this.preloader = true;
    },

    disable_preloader() {
      this.preloader = false;
    },

    async register(email, password) {

      this.enable_preloader()

      this.SEND_A_USER_REGISTRATION_REQUEST_TO_THE_API({ email: email, password: password })
        .then((result) => {
          this.status_info = result;
        })
        .catch((error) => {
          this.status_info = error;
        })
        .finally(() => {
          this.disable_preloader();
        })


    },
  },
  mounted() {
    if (this.GET_AUTH_TOKEN) {
      this.REDIRECT_TO_THE_PAGE('main');
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

.checkbox {
  background-color: #64B687;
}

.checkbox:checked,
.checkbox:active,
.checkbox:focus-visible {
  border: none;
  outline: none;
  box-shadow: none;
  background-color: #64B687;
}

.form-check-label {
  color: #64B687;
}

.reg-button {
  background-color: #64B687;
  border: none;
  outline: none;
  box-shadow: none;
  padding: 10px 20px;
  transition: 0.5s ease;
  border-radius: 5px;
  width: 100%;
}

.reg-button:hover {
  background-color: #4F775C;

}

.sign-up-link {
  color: #64B687;
}

small {
  width: 100%;
}
</style>

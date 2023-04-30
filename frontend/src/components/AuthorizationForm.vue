<template>
  <form class="form shadow-lg rounded bg-white mt-5 px-5 py-4 mx-auto" action="#"
    @submit.prevent='sign_in(email, password, remember_me)'>
    <standart-preloader v-if="preloader"></standart-preloader>
    <h1 class="mb-4 text-center">Вход</h1>
    <div class="form-group my-3">
      <input v-model="email" type="text" class="form-control" id="email" aria-describedby="emailHelp"
        placeholder="Введите почту">
    </div>
    <div class="form-group my-3">
      <input v-model="password" type="password" class="form-control" id="password" placeholder="Пароль">
    </div>
    <div class="form-check my-2">
      <input v-model="remember_me" type="checkbox" class="checkbox form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
    </div>
    <button type="submit" class="reg-button text-white">Отправить</button>
    <small class="text-center">Нет аккаунта?
      <router-link :to="{ name: 'registration' }">
        <span class="sign-up-link">Зарегистрировать</span>
      </router-link>
    </small>
    <br>
    <small>{{ status_info }}</small>
  </form>
</template>

<script>
import StandartPreloader from "@/assets/widgets/StandartPreloader";
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'AuthorizationForm',
  components: {
    StandartPreloader,
  },
  data() {
    return {
      email: '',
      password: '',
      remember_me: false,
      status_info: '',
      preloader: false,
    }
  },
  computed: {
    ...mapGetters(['GET_AUTH_TOKEN']),
  },
  methods: {
    ...mapActions(['AUTHORIZE_THE_USER', 'REDIRECT_TO_THE_PAGE', 'GET_USER_AUTHORIZATION_DATA_FROM_COOKIES']),


    enable_preloader() {
      this.preloader = true;
    },

    disable_preloader() {
      this.preloader = false;
    },

    async sign_in(email, password, remember_me) {

      this.enable_preloader()

      this.AUTHORIZE_THE_USER({ email: email, password: password, remember_me: remember_me }).then((result) => {
        this.password = '';
        this.status_info = result;
      })
        .catch((error) => {
          this.status_info = error;
        })
        .finally(() => {
          this.disable_preloader()
        })


    },
  },
  mounted() {
    if (this.GET_AUTH_TOKEN) {
      this.REDIRECT_TO_THE_PAGE('main') //почему-то не работает
    }
    try {
      this.email, this.password = this.GET_USER_AUTHORIZATION_DATA_FROM_COOKIES();
    }
    catch {
      return 0;
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

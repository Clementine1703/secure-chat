<template>
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
      aria-expanded="false">
        Аккаунт
    </a>
    <ul class="dropdown-menu">
      <li><router-link :to="{name: 'profile'}" class="dropdown-item">Профиль</router-link></li>
      <li><a class="dropdown-item" href="#">Настройки</a></li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" href="#" @click.prevent="logout()">Выход</a></li>
    </ul>

</template>



<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'SmallProfile',
  components:{},
  computed:{
  },
  methods:{
    ...mapMutations(['SET_AUTH_TOKEN', 'SET_WEBSOCKET_CONNECTION', 'SET_WEBSOCKET_INDICATOR']),
    ...mapActions(['REDIRECT_TO_THE_PAGE', 'REMOVE_AUTH_TOKEN_FROM_COOKIES']),

    logout(){
      this.SET_AUTH_TOKEN('');
      this.REMOVE_AUTH_TOKEN_FROM_COOKIES();
      this.REDIRECT_TO_THE_PAGE('authentication');
      this.SET_WEBSOCKET_CONNECTION(false);
      this.SET_WEBSOCKET_INDICATOR(true);
      // this.$cookies.remove('auto_login');
      // this.$cookies.remove('auto_password');
    }
  }

}

</script>


<style scoped>

.small-profile{
  width: 24px;
  height: 24px;
  background-color: #0f0f0f;
}

</style>
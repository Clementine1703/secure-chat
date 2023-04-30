<template>
  <div class="container d-flex">
    <div class="dialog-shortcuts">
      <form class="form-inline d-flex" @submit.prevent>
        <input v-model="chats_search_value" class="form-control mr-sm-2" type="search" placeholder="Имя чата"
          aria-label="Search" @input='GET_USER_CHATS_LIST_FROM_API(chats_search_value)'>
        <button class="btn btn-outline-success my-2 my-sm-0">Искать</button>
      </form>

      <router-link v-for="element in GET_CHATS_LIST" :to="{ name: 'active-dialog', params: { 'id': element.chat } }"
        :key="element.chat">
        <div class="dialog-shortcuts__item" :class="{ active: active_chat == element.chat }">
          <div class="dialog-shortcuts__name">
            {{ element.name }}
          </div>
          <div class="dialog-shortcuts__last-message">
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>



<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'MyDialogs',
  components: {},
  data() {
    return {
      chats: [],
      messages: [],
      axios_response: '',
      me: '', //логин пользователя
      active_chat: false,
      new_message: '',
      chats_search_value: '',
      updates_timer_id: false,
    }
  },
  computed: {
    ...mapGetters(['GET_CHATS_LIST', 'GET_AUTH_TOKEN'])
  },
  methods: {
    ...mapActions(['GET_USER_CHATS_LIST_FROM_API', 'REDIRECT_TO_THE_PAGE']),
  },

  mounted() {
    if (this.GET_AUTH_TOKEN) {
      this.GET_USER_CHATS_LIST_FROM_API();
    } else {
      alert('войдите в аккаунт');
      this.REDIRECT_TO_THE_PAGE('main')
    }
  },
}

</script>


<style scoped>
a,
a:hover {
  text-decoration: none;
  color: white;
}

.dialog-shortcuts {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  margin: 30px 0;
  overflow: auto;
}

.dialog-shortcuts__item {
  display: flex;
  align-items: center;
  padding: 0;
  width: 100%;
  min-height: 90px;
  justify-content: space-around;
  cursor: pointer;
  color: white;
  background-color: rgba(88, 181, 128, 0.98);
  font-size: 25px;
  text-transform: uppercase;
  border-radius: 5px;
}

.dialog-shortcuts__item:first-child {
  margin-top: 20px;
}

.dialog-shortcuts__item:hover {
  background-color: rgb(36, 88, 58);
  color: white;
}
</style>
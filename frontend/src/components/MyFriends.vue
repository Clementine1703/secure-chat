<template>
  <standart-preloader v-if="preloader"></standart-preloader>
  <div class="container list users">
    <div>Пользователи сайта</div>
    <div class="list__item" v-for="user in GET_ALL_USERS_LIST" :key="user.username">
      {{ user.username }}
      <div class="add-to-friends-btn" @click="send_friends_request(user.username)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M12.5 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM8.5 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-4-.25a.75.75 0 1 0-1.5 0v2H1a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Zm4.16 7.23c.86-.46 2.19-.73 3.84-.73s2.98.27 3.85.73c.79.42 1.15.96 1.15 1.7a.69.69 0 0 1-.05.3.33.33 0 0 1-.1.12c-.07.06-.25.15-.6.15h-8.5c-.35 0-.53-.1-.6-.16a.33.33 0 0 1-.1-.12.69.69 0 0 1-.05-.28c0-.75.36-1.3 1.16-1.71Zm3.84-2.23c-1.77 0-3.38.28-4.55.9S6 13.26 6 14.7c0 .69.27 1.22.69 1.56.4.34.95.5 1.55.5h8.52c.6 0 1.14-.16 1.55-.5.42-.34.69-.87.69-1.56 0-1.43-.78-2.42-1.95-3.04a9.96 9.96 0 0 0-4.55-.9Z"
            clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
  </div>

  <div class="container list friends" v-if="GET_FRIENDS_LIST.length">
    <div>Друзья</div>
    <div class="list__item" v-for="friend in GET_FRIENDS_LIST" :key="friend.friend">
      {{ friend.friend }}
      <div class="add-to-friends-btn" @click="remove_from_friends(friend.friend)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M12.5 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM8.5 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-4-.25a.75.75 0 1 0-1.5 0v2H1a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Zm4.16 7.23c.86-.46 2.19-.73 3.84-.73s2.98.27 3.85.73c.79.42 1.15.96 1.15 1.7a.69.69 0 0 1-.05.3.33.33 0 0 1-.1.12c-.07.06-.25.15-.6.15h-8.5c-.35 0-.53-.1-.6-.16a.33.33 0 0 1-.1-.12.69.69 0 0 1-.05-.28c0-.75.36-1.3 1.16-1.71Zm3.84-2.23c-1.77 0-3.38.28-4.55.9S6 13.26 6 14.7c0 .69.27 1.22.69 1.56.4.34.95.5 1.55.5h8.52c.6 0 1.14-.16 1.55-.5.42-.34.69-.87.69-1.56 0-1.43-.78-2.42-1.95-3.04a9.96 9.96 0 0 0-4.55-.9Z"
            clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
  </div>

  <div class="container list requests" v-if="GET_FRIEND_REQUESTS_LIST.length">
    <div>Заявки</div>
    <div class="list__item" v-for="request in GET_FRIEND_REQUESTS_LIST" :key="request.sender">
      {{ request.sender }}
      <div class="add-to-friends-btn" @click="add_to_friends(request.sender)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M12.5 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM8.5 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-4-.25a.75.75 0 1 0-1.5 0v2H1a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Zm4.16 7.23c.86-.46 2.19-.73 3.84-.73s2.98.27 3.85.73c.79.42 1.15.96 1.15 1.7a.69.69 0 0 1-.05.3.33.33 0 0 1-.1.12c-.07.06-.25.15-.6.15h-8.5c-.35 0-.53-.1-.6-.16a.33.33 0 0 1-.1-.12.69.69 0 0 1-.05-.28c0-.75.36-1.3 1.16-1.71Zm3.84-2.23c-1.77 0-3.38.28-4.55.9S6 13.26 6 14.7c0 .69.27 1.22.69 1.56.4.34.95.5 1.55.5h8.52c.6 0 1.14-.16 1.55-.5.42-.34.69-.87.69-1.56 0-1.43-.78-2.42-1.95-3.04a9.96 9.96 0 0 0-4.55-.9Z"
            clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
  </div>


</template>
  
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import StandartPreloader from "@/assets/widgets/StandartPreloader.vue";

export default {
  name: 'MyFriends',
  components:{StandartPreloader},
  data() {
    return {
      users: [],
      friends: [],
      friends_requests: [],
      preloader: true,
    }
  },
  computed: {
    ...mapGetters(['GET_ALL_USERS_LIST', 'GET_FRIEND_REQUESTS_LIST', 'GET_FRIENDS_LIST', 'GET_WEBSOCKET_CONNECTION']),
  },
  methods: {
    ...mapActions(['GET_ALL_USERS_FROM_API', 'SEND_FRIENDS_REQUEST_TO_USER', 'GET_FRIEND_REQUESTS_FROM_API', 'GET_FRIENDS_LIST_FROM_API', 'REMOVE_USER_FROM_FRIENDS_LIST_API', 'ACCEPT_A_FRIEND_REQUEST', 'REMOVE_USER_FROM_FRIENDS_LIST_STORE', 'ADD_USER_TO_FRIENDS_LIST_STORE', 'ADD_REQUEST_TO_FRIEND_REQUESTS_LIST_STORE', 'REMOVE_REQUEST_FROM_FRIEND_REQUESTS_LIST_STORE', 'SET_WEBSOCKET_EVENT_HANDLER_INTERACTION_WITH_USERS', 'RESET_WEBSOCKET_EVENT_HANDLER', 'CALL_NEW_ALERT']),
    ...mapMutations(['SET_FRIENDS_LIST', 'SET_FRIEND_REQUESTS_LIST', 'ADD_NEW_ALERT_TO_ACTIVE_ALERTS', 'DELETE_ALERT_FROM_ACTIVE_ALERTS']),

    get_all_users_from_api() {
      this.GET_ALL_USERS_FROM_API()
    },

    send_friends_request(username) {

      let alert_id = Math.random(9999999);
      this.CALL_NEW_ALERT({text: 'aaa', id: alert_id})


      this.SEND_FRIENDS_REQUEST_TO_USER(username)

    },

    get_friends_requests() {
      this.GET_FRIEND_REQUESTS_FROM_API().then
    },

    add_to_friends(username) {
      this.ACCEPT_A_FRIEND_REQUEST(username)
    },

    remove_from_friends(username) {
      this.REMOVE_USER_FROM_FRIENDS_LIST_API(username)
    },

    get_friends() {
      this.GET_FRIENDS_LIST_FROM_API()
    },

    get_users_and_friends_and_requests(){
      this.preloader = true;
      new Promise((resolve, reject)=>{
        try{
          this.get_all_users_from_api()
          this.get_friends_requests()
          this.get_friends()
          resolve(true)
        }
        catch(e){
          reject(e)
        }
      }).then(()=>{
        this.preloader = false
      }).catch((e)=>{
        console.error(e)
        this.preloader = false
      })
    },

  },
  mounted() {
    if (this.GET_WEBSOCKET_CONNECTION.readyState == WebSocket.OPEN) {
      //Если вебсокет-соединение открыто, то просто меняем обработчик событий
      //и получаем списки пользователей, заявок и друзей
      this.SET_WEBSOCKET_EVENT_HANDLER_INTERACTION_WITH_USERS()

      this. get_users_and_friends_and_requests()
    } else {
      //Если закрыто, то меняем обработчик событий когда соединение откроется
      //и получаем списки пользователей, заявок и друзей
      this.GET_WEBSOCKET_CONNECTION.onopen = () => {
        this.SET_WEBSOCKET_EVENT_HANDLER_INTERACTION_WITH_USERS()

        this.get_users_and_friends_and_requests()
      }
    }
  },
  unmounted() {
    this.RESET_WEBSOCKET_EVENT_HANDLER()
  }
}
</script>
  
<style scoped>
.list {
  margin: 30px 0;
}

.list__item {
  position: relative;
  width: 100%;
  padding: 10px 20px;
  margin: 10px;
}

.users .list__item {
  border: 2px solid gray;
}

.friends .list__item {
  border: 2px solid #64B687;
}

.requests .list__item {
  border: 2px solid yellow;
}

.list__item:hover {
  background-color: #64b6882f;
}

.list__item .add-to-friends-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  cursor: pointer;
  top: 7.5px;
  right: 7.5px;
}

.users .list__item .add-to-friends-btn svg path {
  fill: #64B687;
}

.friends .list__item .add-to-friends-btn svg path {
  fill: rgba(255, 0, 0, 0.683);
}
</style>
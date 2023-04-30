<template>
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

export default {
  name: 'MyFriends',
  data() {
    return {
      users: [],
      friends: [],
      friends_requests: [],
    }
  },
  computed: {
    ...mapGetters(['GET_ALL_USERS_LIST', 'GET_FRIEND_REQUESTS_LIST', 'GET_FRIENDS_LIST']),
  },
  methods: {
    ...mapActions(['GET_ALL_USERS_FROM_API', 'SEND_FRIENDS_REQUEST_TO_USER', 'GET_FRIEND_REQUESTS_FROM_API', 'GET_FRIENDS_LIST_FROM_API', 'REMOVE_USER_FROM_FRIENDS_LIST_API', 'ACCEPT_A_FRIEND_REQUEST']),
    ...mapMutations(['SET_FRIENDS_LIST', 'SET_FRIEND_REQUESTS_LIST', 'REMOVE_USER_FROM_FRIENDS_LIST_STORE', 'ADD_USER_TO_FRIENDS_LIST_STORE', 'ADD_REQUEST_TO_FRIEND_REQUESTS_LIST_STORE' , 'REMOVE_REQUEST_FROM_FRIEND_REQUESTS_LIST_STORE']),

    get_all_users_from_api() {

      this.GET_ALL_USERS_FROM_API()

    },

    send_friends_request(username) {

      this.SEND_FRIENDS_REQUEST_TO_USER(username)

    },

    get_friends_requests() {
      this.GET_FRIEND_REQUESTS_FROM_API()
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
  },
  mounted() {
    this.get_all_users_from_api()
    this.get_friends_requests()
    this.get_friends()
    this.$store.state.data.websocket_connection.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.message.request) {
        if (data.message.request.type === 'friend') {
          console.log(data.message.request)
          // когда принимают нашу заявку
          if (data.message.request.action === 'add') {
            this.ADD_USER_TO_FRIENDS_LIST_STORE({friend: data.message.data.username})
          }
          //когда нам кидают завку
          if (data.message.request.action === 'send_request') {
            this.ADD_REQUEST_TO_FRIEND_REQUESTS_LIST_STORE({sender: data.message.data.username})
          }
          if (data.message.request.action === 'remove') {
            this.REMOVE_USER_FROM_FRIENDS_LIST_STORE({friend: data.message.data.username})
          }
        }
      }

    };
  },
  unmounted() {
    this.$store.state.data.websocket_connection.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data.message)
    };
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
<template>
    <div class="container list users">
      <div>Пользователи сайта</div>
        <div class="list__item" v-for="user in users" :key="user.username">
          {{ user.username }}
          <div class="add-to-friends-btn" @click="send_friends_request(user.username)">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.5 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM8.5 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-4-.25a.75.75 0 1 0-1.5 0v2H1a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Zm4.16 7.23c.86-.46 2.19-.73 3.84-.73s2.98.27 3.85.73c.79.42 1.15.96 1.15 1.7a.69.69 0 0 1-.05.3.33.33 0 0 1-.1.12c-.07.06-.25.15-.6.15h-8.5c-.35 0-.53-.1-.6-.16a.33.33 0 0 1-.1-.12.69.69 0 0 1-.05-.28c0-.75.36-1.3 1.16-1.71Zm3.84-2.23c-1.77 0-3.38.28-4.55.9S6 13.26 6 14.7c0 .69.27 1.22.69 1.56.4.34.95.5 1.55.5h8.52c.6 0 1.14-.16 1.55-.5.42-.34.69-.87.69-1.56 0-1.43-.78-2.42-1.95-3.04a9.96 9.96 0 0 0-4.55-.9Z" clip-rule="evenodd"></path></svg>
          </div>
        </div>
    </div>

    <div class="container list friends" v-if="friends.length">
      <div>Друзья</div>
        <div class="list__item" v-for="friend in friends" :key="friend.id">
          {{ friend.friend }}
          <div class="add-to-friends-btn" @click="remove_from_friends(friend.id)">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.5 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM8.5 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-4-.25a.75.75 0 1 0-1.5 0v2H1a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Zm4.16 7.23c.86-.46 2.19-.73 3.84-.73s2.98.27 3.85.73c.79.42 1.15.96 1.15 1.7a.69.69 0 0 1-.05.3.33.33 0 0 1-.1.12c-.07.06-.25.15-.6.15h-8.5c-.35 0-.53-.1-.6-.16a.33.33 0 0 1-.1-.12.69.69 0 0 1-.05-.28c0-.75.36-1.3 1.16-1.71Zm3.84-2.23c-1.77 0-3.38.28-4.55.9S6 13.26 6 14.7c0 .69.27 1.22.69 1.56.4.34.95.5 1.55.5h8.52c.6 0 1.14-.16 1.55-.5.42-.34.69-.87.69-1.56 0-1.43-.78-2.42-1.95-3.04a9.96 9.96 0 0 0-4.55-.9Z" clip-rule="evenodd"></path></svg>
          </div>
        </div>
    </div>

    <div class="container list requests" v-if="friends_requests.length">
      <div>Заявки</div>
        <div class="list__item" v-for="request in friends_requests" :key="request.id">
          {{ request.sender }}
          <div class="add-to-friends-btn" @click="add_to_friends(request.id)">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.5 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM8.5 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-4-.25a.75.75 0 1 0-1.5 0v2H1a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Zm4.16 7.23c.86-.46 2.19-.73 3.84-.73s2.98.27 3.85.73c.79.42 1.15.96 1.15 1.7a.69.69 0 0 1-.05.3.33.33 0 0 1-.1.12c-.07.06-.25.15-.6.15h-8.5c-.35 0-.53-.1-.6-.16a.33.33 0 0 1-.1-.12.69.69 0 0 1-.05-.28c0-.75.36-1.3 1.16-1.71Zm3.84-2.23c-1.77 0-3.38.28-4.55.9S6 13.26 6 14.7c0 .69.27 1.22.69 1.56.4.34.95.5 1.55.5h8.52c.6 0 1.14-.16 1.55-.5.42-.34.69-.87.69-1.56 0-1.43-.78-2.42-1.95-3.04a9.96 9.96 0 0 0-4.55-.9Z" clip-rule="evenodd"></path></svg>
          </div>
        </div>
    </div>
  
  </template>
  
  <script>
  import axios from "axios";

  export default {
    name: 'MyFriends',
    data(){
        return{
            users: [],
            friends: [],
            friends_requests: [],
        }
    },
    methods:{
      get_profile(value){
          axios(
            {
              method: 'post',
              url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/profiles/`,
              mode: 'cors',
              headers: {
                Authorization: `Token ${this.$store.state.auth_token}`,
              },
              data: {
                'value': value,
              }
            }
          )
          .then((response) => {
            this.users = response.data.response
          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },
    send_friends_request(username){
          axios(
            {
              method: 'post',
              url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/friends/newrequest`,
              mode: 'cors',
              headers: {
                Authorization: `Token ${this.$store.state.auth_token}`,
              },
              data: {
                'username': username,
              }
            }
          )
          .then((response) => {
            if (response.data.status == 'ok'){
              alert('Заявка успешно отправлена!')
            } else {
              alert(response.data.message)
            }
            
          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },
    get_friends_requests(){
          axios(
            {
              method: 'post',
              url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/friends/newrequest`,
              mode: 'cors',
              headers: {
                Authorization: `Token ${this.$store.state.auth_token}`,
              },
              data: {
                'username': '',
              }
            }
          )
          .then((response) => {
            this.friends_requests = []
            this.friends_requests = response.data
          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },
    add_to_friends(id){
          axios(
            {
              method: 'post',
              url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/friends/accept`,
              mode: 'cors',
              headers: {
                Authorization: `Token ${this.$store.state.auth_token}`,
              },
              data: {
                'id': id,
              }
            }
          )
          .then((response) => {
            console.log(response.data)
            this.get_friends()
            if (response.data.ok){
              this.friends_requests = []
              this.get_friends_requests()
            }
          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },

    remove_from_friends(id){
          axios(
            {
              method: 'post',
              url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/friends/remove`,
              mode: 'cors',
              headers: {
                Authorization: `Token ${this.$store.state.auth_token}`,
              },
              data: {
                'id': id,
              }
            }
          )
          .then((response) => {
            if (response.data.status == 'ok'){
              alert('Успешно')
            } else {
              alert(response.data.message)
            }
            this.get_friends()
          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },
    
    get_friends(){
          axios(
            {
              method: 'get',
              url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/friends/accept`,
              mode: 'cors',
              headers: {
                Authorization: `Token ${this.$store.state.auth_token}`,
              }
            }
          )
          .then((response) => {
            this.friends = []
            this.friends = response.data
          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },
    },
    mounted(){
      this.get_profile('')
      this.get_friends_requests()
      this.get_friends()
    }
  }
  </script>
  
  <style scoped>
.list{
  margin: 30px 0;
}

.list__item{
  position: relative;
  width: 100%;
  padding: 10px 20px;
  margin: 10px;
}

.users .list__item{
  border: 2px solid gray;
}

.friends .list__item{
  border: 2px solid #64B687;
}

.requests .list__item{
  border: 2px solid yellow;
}

.list__item:hover{
  background-color: #64b6882f;
}

.list__item .add-to-friends-btn{
  position: absolute;
  width: 30px;
  height: 30px;
  cursor: pointer;
  top: 7.5px;
  right: 7.5px;
}

.users .list__item .add-to-friends-btn svg path{
  fill: #64B687;
}

.friends .list__item .add-to-friends-btn svg path{
  fill: rgba(255, 0, 0, 0.683);
}


  </style>
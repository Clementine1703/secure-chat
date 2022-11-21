<template>

  <div class="container d-flex" >
    <div class="dialog-shortcuts">
      <div v-for="element in chats" class="dialog-shortcuts__item" :class="{active: active_chat == element.chat}" :key="element.chat" @click="changeActiveChat(element.chat)">
        <div class="dialog-shortcuts__name">
          {{element.name}}
        </div>
        <div class="dialog-shortcuts__last-message">
        </div>
      </div>


    </div>
    <div class="dialog-details">
      <div v-for="element in messages" class="dialog-details__message" :class="{'my-message': element.user == my_id, 'float-end': element.user != my_id}" :key="element.message_id">
          {{element.content}}
      </div>
      <form action="#" @submit.prevent="post_message(active_chat, new_message)" class="new-message-form">
        <input type="text" v-model="new_message" placeholder="Текст сообщения">
        <button>Отправить</button>
      </form>
      
      <!-- <div class="dialog-details__message">
        Привет, друг! Чем мы займемся на этой неделе?
      </div> -->
    </div>
  </div>

</template>



<script>
import axios from "axios";

export default {
  name: 'MyDialogs',
  components:{},
  computed:{
    friends_count(){
      return this.friends.users.length;
    }
  },
  data(){
    return {
      chats:[],
      messages:[],
      axios_response: '',
      my_id: 0,
      active_chat: false,
      new_message: '',
    }
  },
  mounted() {
    this.get_dialogs();
  },
  methods:{
    get_dialogs(){
      axios(
          {
            method: 'get',
            url: `${this.$store.state.base_url}/api/chat/get`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.status.auth_token}`,
            },

          }
      )
          .then((response) => {
            let result = response.data;
            for (let i in result){
              this.chats.push(result[i]);
            }
            this.changeActiveChat(result[0].chat)
            this.get_messages(result[0].chat)

          })
          .catch((error) => {
            this.axios_response = error;
          })
    },

    get_messages(chat_id){
      axios(
          {
            method: 'post',
            url: `${this.$store.state.base_url}/api/message/get`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.status.auth_token}`,
            },
            data:{
              chat_id: chat_id,
            },

          }
      )
          .then((response) => {
            let result = response.data.messages;
            this.messages = []
            for (let i in result){
              this.messages.push(result[i]);
            }
            this.my_id = response.data.your_id

          })
          .catch((error) => {
            alert(error)
          })
    },

    post_message(chat_id, content){
      axios(
          {
            method: 'post',
            url: `${this.$store.state.base_url}/api/message/post`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.status.auth_token}`,
            },
            data:{
              chat_id: chat_id,
              content: content,
            },

          }
      )
          .then(() => {
            this.get_messages(chat_id)
            this.new_message = ''
          })
          .catch((error) => {
            alert(error)
          })
    },

    changeActiveChat(id){
      this.active_chat = id
      this.get_messages(id)
    }
  }


}

</script>


<style scoped>

  .dialog-shortcuts{
    display: flex;
    flex-direction: column;
    width: 27%;
    height: 500px;
    border: 2px solid black;
    margin: 30px 0;
    overflow: auto;
  }

  .dialog-shortcuts__item{
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    min-height: 90px;
    border-bottom: 2px solid black;
    justify-content: space-around;
    cursor: pointer;
  }

  .dialog-shortcuts__item:hover{
    color:  rgb(100, 182, 135);
  }

  .dialog-shortcuts__item.active{
    background-color: rgb(100, 182, 135);
    color: white;
  }

  

  .dialog-shortcuts__name{
  }

  .dialog-shortcuts__last-message{
  }

  .dialog-details{
    position: relative;
    overflow: auto;
    width: 73%;
    height: 500px;
    border: 2px solid black;
    margin: 30px 0;
  }

  .dialog-details__message{
    position: relative;
    min-width: 30%;
    max-width: 70%;
    min-height: 40px;
    background-color: rgb(100, 182, 135);
    border-radius: 9px;
    padding: 10px 20px;
    margin: 30px;
    color: white;
    margin-bottom: 30px;
    clear: both;
  }


  

  .dialog-details__message::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 15px transparent solid;
    border-top: 15px rgb(100, 182, 135) solid;
    bottom: -25px;
    right: 30px;
  }

  .dialog-details__message.my-message::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 15px transparent solid;
    border-top: 15px rgb(100, 182, 135) solid;
    bottom: -25px;
    left: 30px;
  }

  .new-message-form{
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    bottom: 0;
  }

  .new-message-form input{
    width: 80%;
    padding: 5px 10px;
  }

  .new-message-form button{
    width: 20%;
  }



</style>
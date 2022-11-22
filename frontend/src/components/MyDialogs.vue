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
      <div v-for="element in messages" class="dialog-details__message" :class="{'my-message': element.user == me, 'float-start': element.user != me}" :key="element.message_id">
          <div class="dialog-details__name">
            <span class="dialog-details__username"><em>{{ element.user }}</em></span>
          </div>

          <div class="dialog-details__content">
            {{element.content}}
          </div>
          
      </div>
      <form action="#" @submit.prevent="post_message(active_chat, new_message)" class="new-message-form">
        <input type="text" v-model="new_message" placeholder="Текст сообщения" @input.prevent required>
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
    },
    

  },
  data(){
    return {
      chats:[],
      messages:[],
      axios_response: '',
      me: '', //логин пользователя
      active_chat: false,
      new_message: '',
    }
  },
  methods:{

    //получаем список диалогов
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

          })
          .catch((error) => {
            this.axios_response = error;
          })
    },

    //check_updates=true -- мы берем только непрочитанные сообщения
    get_messages(chat_id, check_updates = false){
      let config = {
            method: 'post',
            url: `${this.$store.state.base_url}/api/message/get`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.status.auth_token}`,
            },
            data:{
              chat_id: chat_id,
              check_updates: check_updates,
            },

          }

      axios(config)
          .then((response) => {
            let result = response.data.messages;
            //если есть новое сообщение
            if (result.length){
              for (let i in result){
              this.messages.push(result[i]);
              }

              //запоминаем свой id
              this.me = response.data.me
            }
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
          .then((request) => {
            //получаем непрочитанные сообщения
            this.get_messages(chat_id, true)
            this.messages.push(request.data)
            this.new_message = ''
          })
          .catch((error) => {
            alert(error)
          })
    },

    changeActiveChat(id){
      this.active_chat = id
      this.messages = []
      this.get_messages(id)
    },
  },

  mounted() {
    this.get_dialogs();

    // устанавливаем ежесекундный запрос к серверу проверяющий наличие обновлений
    setInterval(()=>{
      this.get_messages(this.active_chat, true)
    }, 1000)
  },


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
    min-width: min-content;
    max-width: 70%;
    min-height: 40px;
    background-color: rgb(100, 182, 135);
    border-radius: 9px;
    padding: 10px 20px;
    margin: 10px 30px;
    color: white;
    margin-bottom: 30px;
    clear: both;
    float: right;
  }


  

  .dialog-details__message:not(.my-message)::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 15px transparent solid;
    border-top: 15px rgb(100, 182, 135) solid;
    bottom: -25px;
    left: 20px;
  }

  .dialog-details__message.my-message::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 15px transparent solid;
    border-top: 15px rgb(100, 182, 135) solid;
    bottom: -25px;
    right: 20px;
  }

  .dialog-details__username{
    font-size: 20px;
    font-weight: 900;
  }

  .new-message-form{
    position: sticky;
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
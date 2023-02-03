<template>

  <div class="container" >
    <div class="dialog-details" ref="dialogDetails">
      <div 
        v-for="element in messages" 
        class="dialog-details__message" 
        :class="{'my-message': element.user == me, 'float-start': element.user != me,'new': element.you_read == false}" 
        :key="element.message_id"
        @click='mark_as_read(element)'
      >
          <div class="dialog-details__name">
            <span class="dialog-details__username"><em>{{ element.user }}</em></span>
          </div>

          <div class="dialog-details__content">
            {{element.content}}
          </div>
          
      </div>
      <form action="#" @submit.prevent="post_message(this.chat_id, new_message)" class="new-message-form">
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
  name: 'ActiveDialog',
  components:{},
  data(){
    return {
      chats:[],
      messages:[],
      axios_response: '',
      me: '', //логин пользователя
      new_message: '',
      updates_timer_id: false,
      chat_id: this.$route.params.id,
    }
  },
  methods:{
    login_check(){
            if (!this.$store.state.auth_token){
                this.$router.push({name: "main"})
                alert("Войдите в аккаунт")
                return false
            } else {
              return true
            }
        
    },
    //скроллим чат в конец
    scrollChatToBottom(){
      this.$refs.dialogDetails.scrollTo(
        0, this.$refs.dialogDetails.scrollHeight
      )
    },
    
    //получаем сообщения
    //check_updates=true -- мы берем только непрочитанные сообщения
    get_messages(chat_id, check_updates = false){
      let config = {
            method: 'post',
            url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/message/get`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.auth_token}`,
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

    //отправляем новое сообщение в базу данных
    post_message(chat_id, content){
      axios(
          {
            method: 'post',
            url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/message/post`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.auth_token}`,
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
            request.data.you_read = true
            this.messages.push(request.data)
            this.new_message = ''
            this.scrollChatToBottom()
          })
          .catch((error) => {
            alert(error)
          })
    },

    //помечаем сообщение прочитанным (запрос в базу данных)
    mark_as_read(message){
      axios(
          {
            method: 'post',
            url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/message/read`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.auth_token}`,
            },
            data: {
              message_id: message.message_id,
            }

          }
      )
          .then((response) => {
            if (response.status == 200){
              message.you_read = true
            }
          })
          .catch(() => {
            console.log('ошибка')
          })
    },

    //переключаем активный чат
  },

  mounted() {
    if (this.login_check()){
      this.get_messages(this.chat_id)
     // устанавливаем ежесекундный запрос к серверу проверяющий наличие обновлений
      this.updates_timer_id = setInterval(()=>{
      this.get_messages(this.chat_id, true)
      }, 2000)
    }
  },

  unmounted(){
    clearInterval(this.updates_timer_id)
  }


}

</script>


<style scoped>


  .dialog-details{
    position: relative;
    overflow: auto;
    width: 100%;
    height: 500px;
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

  .dialog-details__message.new{
    color: red;
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
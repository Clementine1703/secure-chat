<template>
  <div class="container">
    <standart-preloader v-if="preloader"></standart-preloader>
    <div class="dialog-details" ref="dialogDetails">
      <div v-for="element in GET_MESSAGES_LIST" class="dialog-details__message"
        :class="{ 'my-message': element.user == GET_USERNAME, 'float-start': element.user != GET_USERNAME, 'new': element.you_read == false }"
        :key="element.message_id" @click='MARK_THE_MESSAGE_AS_READ_API(element)'>
        <div class="dialog-details__name">
          <span class="dialog-details__username"><em>{{ element.user }}</em></span>
        </div>
        <div class="dialog-details__content">
          {{ element.content }}
        </div>
      </div>
    </div>


    <form action="#" @submit.prevent="post_message(this.chat_id, new_message)" class="new-message-form">
      <input type="text" v-model="new_message" placeholder="Текст сообщения" @input.prevent required>
      <button>Отправить</button>
    </form>
  </div>
</template>



<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import StandartPreloader from "@/assets/widgets/StandartPreloader.vue";

export default {
  name: 'ActiveDialog',
  components: { StandartPreloader },
  data() {
    return {
      chats: [],
      messages: [],
      axios_response: '',
      new_message: '',
      updates_timer_id: false,
      chat_id: this.$route.params.id,
      preloader: true,
    }
  },
  computed: {
    ...mapGetters(['GET_USERNAME', 'GET_MESSAGES_LIST', 'GET_WEBSOCKET_CONNECTION', 'GET_AUTH_TOKEN'])
  },
  methods: {
    ...mapMutations(['SET_MESSAGES_LIST']),
    ...mapActions(['GET_NEW_MESSAGES_FROM_API', 'GET_ALL_MESSAGES_FROM_API', 'POST_NEW_MESSAGE_TO_API', 'MARK_THE_MESSAGE_AS_READ_API', 'START_LISTENING_NEW_MESSAGES_ON_WEBSOCKET', 'SET_WEBSOCKET_EVENT_HANDLER_TO_WORK_WITH_MESSAGES', 'REDIRECT_TO_THE_PAGE', 'RESET_WEBSOCKET_EVENT_HANDLER']),


    enable_preloader() {
      this.preloader = true;
    },

    disable_preloader() {
      this.preloader = false;
    },

    //скроллим чат в конец
    scrollChatToBottom() {
      this.$refs.dialogDetails.scrollTop = this.$refs.dialogDetails.scrollHeight
    },

    //получаем сообщения
    //check_updates=true -- мы берем только непрочитанные сообщения
    get_all_messages(chat_id, check_updates = false) {

      this.GET_ALL_MESSAGES_FROM_API({ chat_id: chat_id, check_updates: check_updates })
        .then(() => {
          this.scrollChatToBottom();
          this.disable_preloader();
        })
        .catch((error) => {
          console.error(error)
          alert(error)
        })
    },

    get_new_messages(chat_id, check_updates = false) {

      this.GET_NEW_MESSAGES_FROM_API({ chat_id: chat_id, check_updates: check_updates })
        .then(() => {
          this.scrollChatToBottom()
        })
        .catch((error) => {
          console.error(error)
        })
    },

    //отправляем новое сообщение в базу данных
    post_message(chat_id, content) {
      this.POST_NEW_MESSAGE_TO_API({ chat_id: chat_id, content: content })
        .then(() => {
          this.new_message = ''
          this.scrollChatToBottom()
        })
        .catch((error) => {
          console.error(error)
        })
    },

    //помечаем сообщение прочитанным (запрос в базу данных)


    //переключаем активный чат
  },

  mounted() {
    if (!this.GET_AUTH_TOKEN) {
      this.REDIRECT_TO_THE_PAGE('authentication')
    } else {


      if (this.GET_WEBSOCKET_CONNECTION.readyState == WebSocket.OPEN) {
        //Если вебсокет-соединение открыто, то просто меняем обработчик событий, 
        //после получаем все сообщения
        this.START_LISTENING_NEW_MESSAGES_ON_WEBSOCKET(this.chat_id)
        this.get_all_messages(this.chat_id)
      } else {
        //Если закрыто, то меняем обработчик событий когда соединение откроется,
        //после получаем все сообщения
        this.GET_WEBSOCKET_CONNECTION.onopen = () => {
          this.START_LISTENING_NEW_MESSAGES_ON_WEBSOCKET(this.chat_id)
          this.get_all_messages(this.chat_id)
        }
      }
      this.SET_WEBSOCKET_EVENT_HANDLER_TO_WORK_WITH_MESSAGES()


    }


  },

  unmounted() {
    this.RESET_WEBSOCKET_EVENT_HANDLER()
    this.SET_MESSAGES_LIST([])
  }


}

</script>


<style scoped>
.dialog-details {
  position: relative;
  overflow-y: auto;
  width: 100%;
  height: 500px;
  margin: 30px 0;
}

.dialog-details__message {
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

.dialog-details__message:not(.my-message).new::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  right: -30px;
  top: 0;
}

.dialog-details__message.my-message.new::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  left: -30px;
  top: 0;
}

.dialog-details__username {
  font-size: 20px;
  font-weight: 900;
}

.new-message-form {
  position: absolute;
  display: flex;
  width: 100%;
  height: 40px;
  top: 100%;
}

.new-message-form input {
  width: 80%;
  padding: 5px 10px;
}

.new-message-form button {
  width: 20%;
}
</style>
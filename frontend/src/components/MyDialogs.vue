<template>

  <div class="container d-flex" >
    <div class="dialog-shortcuts">
      <form class="form-inline d-flex" @submit.prevent>
        <input v-model="chats_search_value" class="form-control mr-sm-2" type="search" placeholder="Имя чата" aria-label="Search" @input='get_dialogs(chats_search_value)'>
        <button class="btn btn-outline-success my-2 my-sm-0">Искать</button>
      </form>

      <router-link 
          :to="{name: 'active-dialog', params: {'id': element.chat}}"
          v-for="element in chats"
          :key="element.chat"
          >
        <div class="dialog-shortcuts__item" :class="{active: active_chat == element.chat}">
            <div class="dialog-shortcuts__name">
              {{element.name}}
            </div>
            <div class="dialog-shortcuts__last-message">
            </div>
        </div>
      </router-link>
    </div>
  </div>

</template>



<script>
import axios from "axios";

export default {
  name: 'MyDialogs',
  components:{},
  data(){
    return {
      chats:[],
      messages:[],
      axios_response: '',
      me: '', //логин пользователя
      active_chat: false,
      new_message: '',
      chats_search_value: '',
      updates_timer_id: false,
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

    //получаем список диалогов
    get_dialogs(chat_name=''){
      axios(
          {
            method: 'post',
            url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/chat/get`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.auth_token}`,
            },
            data: {
              chat_name: chat_name,
            }

          }
      )
          .then((response) => {
            this.chats = []
            let result = response.data;
            for (let i in result){
              this.chats.push(result[i]);
            }
          })
          .catch(() => {
            alert('Ошибка запроса к серверу');
          })
    }, 

    
  },

  mounted() {
    if (this.login_check()){
      this.get_dialogs();
    }
  },
}

</script>


<style scoped>
  a, a:hover{
    text-decoration: none;
    color: white;
  }

  .dialog-shortcuts{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500px;
    margin: 30px 0;
    overflow: auto;
  }

  .dialog-shortcuts__item{
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

  .dialog-shortcuts__item:first-child{
    margin-top: 20px;
  }

  .dialog-shortcuts__item:hover{

  }

  .dialog-shortcuts__item.active{
    background-color: rgb(100, 182, 135);
    color: white;
  }
</style>
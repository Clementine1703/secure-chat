<template>
  <site-header></site-header>
	<router-view @click="my_click()"></router-view>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";

export default {
	name: 'App',
	components: {
		SiteHeader
	},

  methods:{
    get_token_from_cookies(){
      if (this.$cookies.get('auth_token')){
        this.$store.state.auth_token = this.$cookies.get('auth_token');
      }
    },

    my_click(){
      const chatSocket = this.$store.state.data.websocket_connection
      chatSocket.send('message')

    },

    create_ws_connection(){
      const chatSocket = new WebSocket(
            `ws://${this.$store.state.base_url}/chat/`
            + `?token=${this.$store.state.auth_token}`
      );
      this.$store.state.data.websocket_connection = chatSocket
      

      this.$store.state.data.websocket_connection.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data.message)
      };

      this.$store.state.data.websocket_connection.onclose = function() {
            console.error('Подключение прервано');
            this.$store.state.data.websocket_connection = ''

      };
    }

  },

  mounted() {
    this.get_token_from_cookies()

    this.create_ws_connection()
    setInterval(()=>{
      if (!this.$store.state.data.websocket_connection){
      this.create_ws_connection()
      console.log('try')
      }
    }, 5000)
  },

}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

root{
  --main-theme-color-light: #64B687;
  --main-theme-color-strong: #4F775C;
}
</style>

<template>
  <site-header></site-header>
  <websocket-connection-indicator class="indicator"></websocket-connection-indicator>
  <router-view></router-view>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";
import WebsocketConnectionIndicator from "./components/WebsocketConnectionIndicator.vue";

export default {
  name: 'App',
  components: {
    SiteHeader,
    WebsocketConnectionIndicator,
  },

  methods: {
    get_token_from_cookies() {
      if (this.$cookies.get('auth_token')) {
        this.$store.state.auth_token = this.$cookies.get('auth_token');
      }
    },

    my_click() {
      const chatSocket = this.$store.state.data.websocket_connection
      chatSocket.send(JSON.stringify({ mesage: 'message' }))

    },

    create_ws_connection() {
      const chatSocket = new WebSocket(
        `ws://${this.$store.state.base_url}/chat/`
        + `?token=${this.$store.state.auth_token}`
      );

      this.$store.state.data.websocket_connection = chatSocket

      this.$store.state.data.websocket_connection.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data.data)
      };

      this.$store.state.data.websocket_connection.onclose = () => {
        this.$store.state.data.websocket_connection = false
        console.error('Подключение прервано');


      };
    }

  },

  mounted() {
    this.get_token_from_cookies()

    this.create_ws_connection()
    setInterval(() => {
      if (!this.$store.state.data.websocket_connection) {
        this.create_ws_connection()
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

root {
  --main-theme-color-light: #64B687;
  --main-theme-color-strong: #4F775C;
}

.indicator {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 9999;
}
</style>

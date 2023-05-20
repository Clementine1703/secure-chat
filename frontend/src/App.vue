<template>
  <site-header></site-header>
  <websocket-connection-indicator class="indicator"></websocket-connection-indicator>
  <router-view></router-view>
  <InformationAlert></InformationAlert>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";
import WebsocketConnectionIndicator from "./components/WebsocketConnectionIndicator.vue";
import { mapGetters, mapMutations } from "vuex";
import InformationAlert from "./assets/widgets/InformationAlert.vue";

export default {
  name: 'App',
  components: {
    SiteHeader,
    WebsocketConnectionIndicator,
    InformationAlert
  },
  computed: {
    ...mapGetters(['GET_WEBSOCKET_CONNECTION', 'GET_BASE_URL', 'GET_AUTH_TOKEN']),
  },

  methods: {
    ...mapMutations(['SET_WEBSOCKET_CONNECTION','SET_WEBSOCKET_INDICATOR', 'SET_AUTH_TOKEN']),
    get_token_from_cookies() {
      if (this.$cookies.get('auth_token')) {
        this.SET_AUTH_TOKEN(this.$cookies.get('auth_token'))
      }
    },

    create_ws_connection() {
      const chatSocket = new WebSocket(
        `ws://${this.GET_BASE_URL}/chat/`
        + `?token=${this.GET_AUTH_TOKEN}`
      );

      this.SET_WEBSOCKET_CONNECTION(chatSocket)
      this.SET_WEBSOCKET_INDICATOR(false)



      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data.data)
      };

      chatSocket.onclose = () => {
        this.SET_WEBSOCKET_CONNECTION(false)
        this.SET_WEBSOCKET_INDICATOR(true)
        console.error('Подключение прервано');
      };
    }
  },

  mounted() {
    this.get_token_from_cookies()

    this.create_ws_connection()
    setInterval(() => {
      if (!this.GET_WEBSOCKET_CONNECTION && this.GET_AUTH_TOKEN) {
        this.create_ws_connection()
      }
    }, 3000)
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
  left: 5px;
  top: 5px;
  z-index: 9999;
}
</style>

<template>
  <div class="indicator" v-if="GET_WEBSOCKET_INDICATOR">
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WebsocketConnectionIndicator',
  components: {},
  props: ['websocketIndicator_is_visible'],
  computed: {
    ...mapGetters(['GET_WEBSOCKET_CONNECTION', 'GET_WEBSOCKET_INDICATOR']),
  },



}
</script>
  
<style>
.indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: red;
}

.indicator::after {
  content: 'Подключение...';

}

.indicator.connected {
  background-color: green;
}
</style>
  
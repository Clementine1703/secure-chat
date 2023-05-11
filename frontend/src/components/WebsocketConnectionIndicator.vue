<template>
  <div class="indicator" v-if="GET_WEBSOCKET_INDICATOR && GET_AUTH_TOKEN">
    <standart-preloader class="loading"></standart-preloader>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import StandartPreloader from '@/assets/widgets/StandartPreloader.vue';

export default {
  name: 'WebsocketConnectionIndicator',
  components: {StandartPreloader},
  props: ['websocketIndicator_is_visible'],
  computed: {
    ...mapGetters(['GET_WEBSOCKET_CONNECTION', 'GET_WEBSOCKET_INDICATOR', 'GET_AUTH_TOKEN']),
  },



}
</script>
  
<style>
.indicator {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.indicator .wrapper{
  background-color: transparent;
}

.loading .preloader-3 svg{
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  scale: 1;
  stroke: black;
}


</style>
  
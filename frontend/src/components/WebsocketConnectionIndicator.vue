<template>
    <div class="indicator" :class="{ connected: (GET_WEBSOCKET_CONNECTION != false)}">

    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
      name: 'WebsocketConnectionIndicator',
      components: {
      },
      computed:{
        ...mapGetters(['GET_WEBSOCKET_CONNECTION'])
      }

  
  }
  </script>
  
  <style>
  .indicator{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: red;
  }

  .indicator.connected{
    background-color: green;
  }
  </style>
  
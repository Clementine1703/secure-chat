<template>
    <div class="indicator" :class="{ connected: (this.$store.state.data.websocket_connection != false)}">

    </div>
  </template>
  
  <script>
  
  export default {
      name: 'WebsocketConnectionIndicator',
      components: {
      },

  
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
  
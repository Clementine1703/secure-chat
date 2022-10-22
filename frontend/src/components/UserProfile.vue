<template>
  <div class="wrapper container">
    <div class="row">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a :class="{ active: (active_tab === 1)}" class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-home" aria-selected="true" @click.prevent = toggle_tab(1)>Что-то еще</a>
        <a :class="{ active: (active_tab === 2)}" class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-profile" aria-selected="false" @click.prevent = toggle_tab(2)>Профиль</a>
        <a :class="{ active: (active_tab === 3)}" class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-messages" aria-selected="false" @click.prevent = toggle_tab(3)>Сообщения</a>
        <a :class="{ active: (active_tab === 4)}" class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-settings" aria-selected="false" @click.prevent = toggle_tab(4)>Настройки</a>
      </div>
      <div class="tab-content" id="v-pills-tabContent">
        <div :class="{ show: (active_tab === 1) ,active: (active_tab === 1)}" class="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">Камиль ты красавчик</div>
        <div :class="{ show: (active_tab === 2) ,active: (active_tab === 2)}" class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">2</div>
        <div :class="{ show: (active_tab === 3) ,active: (active_tab === 3)}" class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">3</div>
        <div :class="{ show: (active_tab === 4) ,active: (active_tab === 4)}" class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">4</div>
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: 'UserProfile',
  components: {
  },
  data(){
    return{
      active_tab: 1,
    }
  },
  methods:{
    toggle_tab(value){
      this.active_tab = value;
    }
  },

}
</script>

<style scoped>
.wrapper {
  margin-top: 56px;
}

.nav{
  width: 30%;
}

.nav-pills .nav-link.active, .nav-pills .show>.nav-link{
  background-color: #64B687;
}

.nav-link{
  color: black;
}

.nav-link:hover{
  color: #64B687;
}

.tab-content{
  width: 50%;
}
</style>
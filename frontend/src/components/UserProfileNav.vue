<template>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a v-for="el in nav_elements" :key="el.tab_number" :class="{ active: (active_tab === el.tab_number)}" class="nav-link" @click.prevent = 'toggle_tab(el.tab_number)'>{{ el.title }}</a>
      </div>
</template>

<script>

export default {
  name: 'UserProfileNav',
  props:['active_tab'],
  components: {
  },
  data(){
    return{
      nav_elements:[
        {title: 'Профиль', slug: 'profile', route_name: '', tab_number: 1},
        {title: 'Сообщения', slug: 'messages', route_name: '', tab_number: 2},
        {title: 'Настройки', slug: 'settings', route_name: '', tab_number: 3},

      ]
    }
  },
  methods:{
    toggle_tab(value){
      this.$emit('toggle_tab', value)
    }
  }
}
</script>

<style scoped>

.nav{
  width: 30%;
}

.nav-pills .nav-link.active, .nav-pills .show>.nav-link{
  background-color: #64B687;
}

.nav-link{
  color: black;
  cursor: pointer;
}

.nav-link:not(.active):hover{
  color: #64B687;
}



</style>
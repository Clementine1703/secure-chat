<template>
  <div class="wrapper container mt-5">
    <div class="row">

      <user-profile-nav
          :active_tab="active_tab"
          @toggle_tab="toggle_tab"
          class="col-4"
      ></user-profile-nav>
      <user-profile-content
          :active_tab="active_tab"
          class="col-8 position-relative"
      ></user-profile-content>

    </div>

  </div>

</template>

<script>
import UserProfileNav from "@/components/UserProfileNav";
import UserProfileContent from "@/components/UserProfileContent";

export default {
  name: 'UserProfile',
  components: {
    UserProfileNav, UserProfileContent
  },
  data(){
    return{
      active_tab: 1,
    }
  },
  methods:{
    toggle_tab(value){
      this.active_tab = value;
    },
  },

}
</script>

<style scoped>
</style>
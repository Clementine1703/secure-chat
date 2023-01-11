<template>
  <site-header></site-header>
	<router-view></router-view>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";

export default {
	name: 'App',
	components: {
		SiteHeader
	},
  mounted() {
    if (this.$cookies.get('auth_token')){
      this.$store.state.auth_token = this.$cookies.get('auth_token');
    }
  }
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

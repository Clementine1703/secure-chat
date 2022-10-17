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
	}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
</style>

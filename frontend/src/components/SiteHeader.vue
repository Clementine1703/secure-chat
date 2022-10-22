<template>
	<nav class="header navbar fixed-top navbar-expand-lg navbar-light justify-content-between shadow-sm bg-white rounded">
		<div class="container ">
			<a class="navbar-brand " href="#">
				<img src="@/assets/images/logo.png" width="30" height="30" class="d-inline-block align-top" alt=""
					loading="lazy">
				Scrumers
			</a>
			<button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Scrumers</h5>
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div class="offcanvas-body">
					<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Главная</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Контакты</a>
						</li>
						<li class="nav-item dropdown me-lg-3">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
								aria-expanded="false">
								Чем мы занимаемся?
							</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Action</a></li>
								<li><a class="dropdown-item" href="#">Another action</a></li>
								<li>
									<hr class="dropdown-divider">
								</li>
								<li><a class="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</li>

						<li class="nav-item ms-lg-3" v-if="!this.$store.state.status.auth"><router-link :to="{name: 'authentication'}"><a class="nav-link" href="#">Войти</a></router-link>
						</li>
						<li class="nav-item" v-if="!this.$store.state.status.auth"><router-link :to="{name: 'registration'}"><a class="nav-link" href="#">Зарегистрироваться</a></router-link>
						</li>
            <li class="nav-item dropdown" v-else><small-profile></small-profile>
            </li>

					</ul>

				</div>
			</div>
		</div>
	</nav>
  <div class="header-space"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import SmallProfile from "@/components/SmallProfile";

export default {
	name: 'SiteHeader',
  computed: {
    current_route_name(){
      return useRoute().path;
    },
  },
  components:{
    SmallProfile
  },
	props: {
		msg: String
	},
  data(){
    return{
      nav:{
          elements: [
            {name: 'Главная'},
            {name: 'Контакты'},
            {name: 'Чем мы занимаемся?'},
            {name: 'Аккаунт'},
          ],
      },
    }
  },
  mounted() {
    // alert(this.current_route_name)
  },
}
</script>
	
<style scoped>
.header {
	margin-bottom: 56px;
}

.header-space{
  width: 100%;
  height: 56px;
}
</style>

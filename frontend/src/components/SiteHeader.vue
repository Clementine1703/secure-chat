<template>
	<nav class="header navbar fixed-top navbar-expand-lg navbar-light justify-content-between shadow-sm bg-white rounded">
		<div class="container ">
			<router-link :to="{name: 'main'}" class="navbar-brand ">
				<img src="@/assets/images/logo.png" width="30" height="30" class="d-inline-block align-top" alt=""
					loading="lazy">
				Scrumers
      </router-link>
			<button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
				<div class="offcanvas-body">
					<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
						<li class="nav-item" >
							<router-link class="nav-link active" aria-current="page" :to="{name: 'main'}" v-if="!this.$store.state.auth_token">Главная</router-link>
						</li>
            <li class="nav-item" >
              <router-link class="nav-link active" aria-current="page" :to="{name: 'dialogs'}">Сообщения</router-link>
            </li>
            <li class="nav-item offset-lg-2" v-if="this.$store.state.auth_token">
              <form class="form-inline d-flex" @submit.prevent>
                <input v-model="users_search_value" class="form-control mr-sm-2" type="search" placeholder="Пользователь" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" @click="finds_users_by_username_from_api(users_search_value)">Искать</button>
              </form>
            </li>
						<li class="nav-item" v-show="!this.$store.state.auth_token">
							<a class="nav-link" href="#">Контакты</a>
						</li>
						<li class="nav-item dropdown me-lg-3" v-if="!this.$store.state.auth_token">
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

						<li class="nav-item ms-lg-3" v-if="!this.$store.state.auth_token"><router-link :to="{name: 'authentication'}"><a class="nav-link" href="#">Войти</a></router-link>
						</li>
						<li class="nav-item" v-if="!this.$store.state.auth_token"><router-link :to="{name: 'registration'}"><a class="nav-link" href="#">Зарегистрироваться</a></router-link>
						</li>
            <li class="nav-item dropdown offset-lg-1" v-else><small-profile></small-profile>
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
import { mapActions } from 'vuex';

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
      users_search_value: '',
    }
  },
  mounted() {
    // alert(this.current_route_name)
  },
  methods:{
    ...mapActions(['FIND_USERS_BY_USERNAME_FROM_API']),

    finds_users_by_username_from_api(username){
      this.FIND_USERS_BY_USERNAME_FROM_API(username)
    }
  }
}
</script>
	
<style scoped>
.header {
	
}

.header-space{
  width: 100%;
  height: 56px;
}
</style>

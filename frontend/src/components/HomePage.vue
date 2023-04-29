<template>
	<div class="wrapper">
		<div class="side_bar_nav">
			<div class="side_bar_nav__element">
				<div class="image">
					<svg height="22" viewBox="0 0 22 22" width="22" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M-3-3h28v28H-3z" opacity=".04"></path><path d="M17 10.9V9.09c0-3.72-2.61-6.58-6-6.58-3.38 0-6 2.86-6 6.58v1.83c0 .92-.38 1.61-1.21 2.59l-.28.33c-.76.88-1.01 1.3-1.01 1.76 0 .22.02.34.07.46.12.26.49.45 1.43.45h14c.91 0 1.29-.2 1.42-.46a.94.94 0 0 0 .08-.45c0-.46-.25-.88-1-1.76l-.3-.33c-.82-.98-1.2-1.66-1.2-2.6zm-1.6 7.6C14.73 20.76 13.2 22 11 22s-3.73-1.24-4.4-3.5H4c-1.67 0-2.76-.57-3.24-1.6-.21-.45-.26-.81-.26-1.31 0-1.12.42-1.83 1.5-3.07l.26-.31c.54-.64.74-1 .74-1.3V9.08C3 4.3 6.47.5 11 .5c4.54 0 8 3.8 8 8.58v1.83c0 .3.2.66.73 1.3l.27.3c1.07 1.25 1.5 1.96 1.5 3.08 0 .5-.06.89-.3 1.36-.5 1-1.58 1.55-3.2 1.55zm-2.12 0H8.72C9.17 19.54 9.9 20 11 20s1.83-.46 2.28-1.5z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
				</div> 
				<div class="text">
					Уведомления
				</div>
			</div>
			<router-link aria-current="page" :to="{name: 'dialogs'}">
				<div class="side_bar_nav__element">
					<div class="image">
						<svg width="28" height="28" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h28v28H0z" opacity=".04"></path><path d="M14 3.5c6.32 0 11.5 4.44 11.5 10s-5.18 10-11.5 10c-1.35 0-2.68-.2-3.92-.6-1.4 1.3-3.46 2-6.13 2.1a1.43 1.43 0 0 1-1.36-2.02C3.5 20.96 4 19.48 4.1 18.6a9 9 0 0 1-1.6-5.1c0-5.56 5.18-10 11.5-10zm0 2c-5.28 0-9.5 3.62-9.5 8 0 1.5.5 2.96 1.43 4.21a1 1 0 0 1 .2.6c-.01 1.05-.46 2.57-1.34 4.63 1.99-.21 3.39-.83 4.25-1.84a1 1 0 0 1 1.1-.29c1.21.45 2.51.69 3.86.69 5.28 0 9.5-3.62 9.5-8s-4.22-8-9.5-8z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
					</div> 
					<div class="text">
						Сообщения
					</div>
				</div>
			</router-link>
			<router-link aria-current="page" :to="{name: 'friends'}">
				<div class="side_bar_nav__element">
					<div class="image">
						<svg width="28" height="28" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h28v28H0z" opacity=".04"></path><path d="M17.5 8.5A3.5 3.5 0 0 0 14 5a3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 1 0 7 0zm2 0A5.5 5.5 0 0 1 14 14a5.5 5.5 0 0 1-5.5-5.5 5.5 5.5 0 1 1 11 0zM7 20.64c0 .95-.08.86.46.86h13.58c.54 0 .46.09.46-.86 0-2.28-3.3-3.64-7.25-3.64S7 18.36 7 20.64zm-2 0C5 16.76 9.3 15 14.25 15s9.25 1.76 9.25 5.64c0 2.02-.78 2.86-2.46 2.86H7.46C5.78 23.5 5 22.66 5 20.64z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
					</div> 
					<div class="text">
						Друзья
					</div>
				</div>
			</router-link>
			<div class="side_bar_nav__element">
				<div class="image">
					<svg width="28" height="28" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h28v28H0z" opacity=".04"></path><path d="M13 4.5a8.5 8.5 0 0 1 6.68 13.76l4.53 4.53a1 1 0 0 1-1.42 1.42l-4.53-4.53A8.5 8.5 0 1 1 13 4.5zm0 2a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
				</div> 
				<div class="text">
					Поиск
				</div>
			</div>
		</div>
		<div class="work-container">
			<router-view>	
			</router-view>
		</div>
		
	</div>
</template>

<script>

export default {
	name: 'HomePage',
	components: {
	}

}
</script>

<style scoped>

.wrapper{
	display: flex;
}

.side_bar_nav{
	width: 25%;
	margin: 30px 30px 30px 60px;
}

@media (max-width: 500px){
	.side_bar_nav{
		width: 100%;
		display: flex;
		position: relative;
	}
}

.side_bar_nav__element{
	display: flex;
	flex-direction: row;
	width: 100%;
	min-height: 30px;
	padding: 10px 10px;
	cursor: pointer;
}

.side_bar_nav__element:hover{
	background-color: #7fba9825;
}

.side_bar_nav__element .image{
	position: absolute;
}

.side_bar_nav__element .image svg path{
	fill: #64B687;
}


.side_bar_nav__element .text{
	margin-left: 50px;
}

.content-container {
	width: 100%;
	height: calc(100vh - 56px);
}

.authorization-form {
	margin-left: 13%;
}

a, a:active, a:focus, a:visited{
	text-decoration: none;
	color: black;
}

.work-container{
	width: 50%;
}
</style>

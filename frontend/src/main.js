import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store"
import router from "@/router";
import VueCookies from 'vue-cookies'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)
app
    .use(store)
    .use(router)
    .use(VueCookies)
    .mount('#app')

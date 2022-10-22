import {createRouter, createWebHashHistory} from "vue-router";

import HomePage from "@/components/HomePage";
import AuthorizationForm from "@/components/AuthorizationForm";
import RegistrationForm from "@/components/RegistrationForm";
import UserProfile from "@/components/UserProfile";
import StandartPreloader from "@/assets/widgets/StandartPreloader";

export default createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            name: 'main',
            component: HomePage,
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: AuthorizationForm,
        },
        {
            path: '/registration',
            name: 'registration',
            component: RegistrationForm,
        },
        {
            path: '/profile',
            name: 'profile',
            component: UserProfile,
        },
        {
            path: '/preloader',
            name: 'preloader',
            component: StandartPreloader,
        },
    ]
})
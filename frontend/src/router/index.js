import {createRouter, createWebHistory} from "vue-router";

import HomePage from "@/components/HomePage";
import AuthorizationForm from "@/components/AuthorizationForm";
import RegistrationForm from "@/components/RegistrationForm";
import UserProfile from "@/components/UserProfile";
import StandartPreloader from "@/assets/widgets/StandartPreloader";
import MyDialogs from "@/components/MyDialogs";
import MyFriends from "@/components/MyFriends";
import ActiveDialog from "@/components/ActiveDialog";

export default createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'main',
            component: HomePage,
            children: [{
                path: '/dialogs',
                name: 'dialogs',
                component: MyDialogs,
              },
              {
                path: '/dialogs/:id',
                name: 'active-dialog',
                component: ActiveDialog,
                },
              {
                path: '/friends',
                name: 'friends',
                component: MyFriends,
              },],
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
        // {
        //     path: '/dialogs',
        //     name: 'dialogs',
        //     component: MyDialogs,
        // },
        {
            path: '/preloader',
            name: 'preloader',
            component: StandartPreloader,
        },
    ]
})
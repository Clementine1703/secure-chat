import {createStore} from "vuex";

export default createStore({
    state:{
        data:{
            user: 'user',
        },
        status:{
            auth: false,
            auth_token: '',
        },
        base_url: 'https://clementine1703.pythonanywhere.com/'
    },
    getters:{},
    actions:{},
    mutations:{}
})
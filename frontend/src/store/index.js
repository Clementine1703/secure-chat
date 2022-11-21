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
        base_url: 'http://127.0.0.1:8000'
    },
    getters:{},
    actions:{},
    mutations:{}
})
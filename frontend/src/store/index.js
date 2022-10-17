import {createStore} from "vuex";

export default createStore({
    state:{
        data:{
            user: 'user',
        },
        status:{
            auth: false,
            auth_token: '',
        }
    },
    getters:{},
    actions:{},
    mutations:{}
})
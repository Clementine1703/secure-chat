import {createStore} from "vuex";

export default createStore({
    state:{
        data:{
            user: 'user',
            websocket_connection: false,
            friends:{
                friends:[],
                friend_requests:[]
            }
        },
        auth_token: '',
        protocol: 'http://',
        base_url: '127.0.0.1:8000',
    },
    getters:{},
    actions:{},
    mutations:{}
})
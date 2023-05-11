import { createStore } from "vuex";
import axios from "axios";
import router from '../router';
import cookie from 'vue-cookies';


export default createStore({
    state: {
        user: {
            auth_token: '',
            username: '',
            additional_data: {
                name: '',
                status: '',
                experience: '',
                sex: '',
                date_of_birth: '',
                date_of_registration: '',
            }
        },

        interaction_with_users: {
            users: [],
            friends: [],
            friend_requests: [],

        },

        chats: {
            chats_list: [],
            active_chat: {
                messages: []
            }
        },
        data: {
            user: 'user',
            websocket_connection: false,
            websocket_indicator: true,
            friends: {
                friends: [],
                friend_requests: []
            }
        },
        auth_token: '',
        protocol: 'http://',
        base_url: '192.168.137.27:8000',
    },
    getters: {
        GET_PROTOCOL(state) {
            return state.protocol
        },
        GET_BASE_URL(state) {
            return state.base_url
        },
        GET_AUTH_TOKEN(state) {
            return state.auth_token
        },
        GET_ADDITIONAL_USER_DATA(state) {
            return state.user.additional_data
        },
        GET_ALL_USERS_LIST(state) {
            return state.interaction_with_users.users
        },
        GET_FRIENDS_LIST(state) {
            return state.interaction_with_users.friends
        },
        GET_FRIEND_REQUESTS_LIST(state) {
            return state.interaction_with_users.friend_requests
        },
        GET_WEBSOCKET_CONNECTION(state) {
            return state.data.websocket_connection
        },
        GET_WEBSOCKET_INDICATOR(state){
            return state.data.websocket_indicator
        },
        GET_CHATS_LIST(state) {
            return state.chats.chats_list
        },
        GET_MESSAGES_LIST(state) {
            return state.chats.active_chat.messages
        },
        GET_USERNAME(state) {
            return state.user.username
        }


    },



    mutations: {
        SET_ADDITIONAL_USER_DATA(state, additional_user_data) {
            state.user.additional_data.name = additional_user_data.name
            state.user.additional_data.status = additional_user_data.status
            state.user.additional_data.experience = additional_user_data.experience
            state.user.additional_data.sex = additional_user_data.sex
            state.user.additional_data.date_of_birth = additional_user_data.date_of_birth
            state.user.additional_data.date_of_registration = additional_user_data.date_of_registration
        },

        SET_WEBSOCKET_CONNECTION(state, websocket_connection){
            state.data.websocket_connection = websocket_connection
        },

        SET_WEBSOCKET_INDICATOR(state, websocket_indicator){
            state.data.websocket_indicator = websocket_indicator
        },

        SET_ALL_USERS_LIST(state, all_users_list) {
            state.interaction_with_users.users = all_users_list
        },

        SET_FRIENDS_LIST(state, friends_list) {
            state.interaction_with_users.friends = friends_list
        },

        SET_FRIEND_REQUESTS_LIST(state, friend_requests_list) {
            state.interaction_with_users.friend_requests = friend_requests_list
        },

        SET_AUTH_TOKEN(state, new_token) {
            state.auth_token = new_token
        },

        SET_CHATS_LIST(state, chats_list) {
            state.chats.chats_list = chats_list
        },

        SET_MESSAGES_LIST(state, messages) {
            state.chats.active_chat.messages = messages
        },

        SET_USERNAME(state, username) {
            state.user.username = username
        },


    },



    actions: {
        REMOVE_USER_FROM_FRIENDS_LIST_STORE({ getters }, element) {
            let friends_list = getters.GET_FRIENDS_LIST

            for (let list_el of friends_list) {
                if (list_el.friend == element.friend) {
                    const index = friends_list.indexOf(list_el)
                    friends_list.splice(index, 1);
                }
            }

        },

        ADD_USER_TO_FRIENDS_LIST_STORE({ getters }, element) {
            let friends_list = getters.GET_FRIENDS_LIST

            friends_list.push(element)

        },

        ADD_REQUEST_TO_FRIEND_REQUESTS_LIST_STORE({ getters }, element) {
            let friend_requsets_list = getters.GET_FRIEND_REQUESTS_LIST

            friend_requsets_list.push(element)

        },

        REMOVE_REQUEST_FROM_FRIEND_REQUESTS_LIST_STORE({ getters }, element) {
            let friend_requests_list = getters.GET_FRIEND_REQUESTS_LIST


            for (let list_el of friend_requests_list) {
                if (list_el.friend == element.friend) {
                    const index = friend_requests_list.indexOf(list_el)
                    friend_requests_list.splice(index, 1);
                }
            }

        },

        SET_WEBSOCKET_EVENT_HANDLER_INTERACTION_WITH_USERS({ getters, dispatch }) {
            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION

            websocket_connection.onmessage = (e) => {
                const data = JSON.parse(e.data);

                if (data.is_a_service_information){
                    return true
                }

                if (data.message.request && !data.service_information) {
                    if (data.message.request.type === 'friend') {
                        console.log(data.message.request)
                        // когда принимают нашу заявку
                        if (data.message.request.action === 'add') {
                            dispatch('ADD_USER_TO_FRIENDS_LIST_STORE', { friend: data.message.data.username })
                        }
                        //когда нам кидают завку
                        if (data.message.request.action === 'send_request') {
                            dispatch('ADD_REQUEST_TO_FRIEND_REQUESTS_LIST_STORE', { sender: data.message.data.username })
                        }
                        if (data.message.request.action === 'remove') {
                            dispatch('REMOVE_USER_FROM_FRIENDS_LIST_STORE', { friend: data.message.data.username })
                        }
                    }
                }

            };
        },

        SET_WEBSOCKET_EVENT_HANDLER_TO_WORK_WITH_MESSAGES({ getters, dispatch }) {
            console.log('установили')

            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION

            console.log(websocket_connection)

            websocket_connection.onmessage = (e) => {
                const data = JSON.parse(e.data);

                //если придет служебное сообщение по типу имени канала
                if (data.is_a_service_information){
                    return true
                }

                if (data.message.request) {

                    let message = data.message.request.data.message

                    if (data.message.request.type === 'message') {
                        console.log(data.message.request)
                        // когда принимают нашу заявку
                        if (data.message.request.action === 'send') {
                            //если это сообщение в вебсокеты отправили не мы
                            if (message.user != getters.GET_USERNAME){
                                message.you_read = false
                                dispatch('ADD_MESSAGE_TO_MESSAGES_LIST_STORE', message)
                            }
                        }
                    }
                }

            };

        },

        START_LISTENING_NEW_MESSAGES_ON_WEBSOCKET({ getters }, chat_id) {
            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION


            websocket_connection.send(JSON.stringify({
                type: 'chat',
                action: 'connect',
                data: {
                    chat_id: chat_id,
                }
            }))
            console.log(websocket_connection)
        },

        RESET_WEBSOCKET_EVENT_HANDLER({ getters }) {
            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION

            websocket_connection.onmessage = function (e) {
                const data = JSON.parse(e.data);
                console.log(data.service_information)
            };

        },




        GET_ADDITIONAL_USER_DATA_FROM_API({ commit, getters }) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            return new Promise((resolve, reject) => {
                axios(
                    {
                        method: 'get',
                        url: `${protocol}${base_url}/api/`,
                        mode: 'cors',
                        headers: {
                            Authorization: `Token ${auth_token}`,
                        }
                    }
                )
                    .then((response) => {
                        let additional_user_data = response.data.user_data[0];
                        commit('SET_ADDITIONAL_USER_DATA', additional_user_data)
                        resolve('Успешно!')
                    })
                    .catch((error) => {
                        reject(new Error('Сould not get data from the server', { cause: error }))
                    })
            })
        },

        POST_ADDITIONAL_USER_DATA_TO_API({ getters }, additional_user_data) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            return new Promise((resolve, reject) => {

                axios(
                    {
                        method: 'post',
                        url: `${protocol}${base_url}/api/`,
                        mode: 'cors',
                        headers: {
                            Authorization: `Token ${auth_token}`,
                        },
                        data: {
                            name: additional_user_data.name,
                            status: additional_user_data.status,
                            sex: additional_user_data.sex,
                            experience: additional_user_data.experience,
                            date_of_birth: additional_user_data.date_of_birth,
                        }
                    }
                )
                    .then(() => {
                        resolve('Изменения успешно сохранены!')
                    })
                    .catch((error) => {
                        reject(new Error('Failed to establish a connection with the server', { cause: error }))
                    })
            })
        },


        FIND_USERS_BY_USERNAME_FROM_API({ getters }, username) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/profiles/`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        'value': username,
                    }
                }
            )
                .then((response) => {
                    alert(response.data.response[0].username)
                })
                .catch((error) => {
                    throw new Error('Failed to establish a connection with the server', { cause: error })
                })
        },

        REDIRECT_TO_THE_PAGE({ getters }, name) {
            console.log(getters)
            router.push({ name: name });
        },

        PLACE_USER_AUTHORIZATION_DATA_IN_COOKIES(email, password) {
            cookie.set('auto_login', email);
            cookie.set('auto_password', password);
        },

        GET_USER_AUTHORIZATION_DATA_FROM_COOKIES() {
            return (cookie.get('auto_login'), this.$cookies.get('auto_password'));
        },

        REMOVE_AUTH_TOKEN_FROM_COOKIES(){
            cookie.remove('auth_token');
        },

        AUTHORIZE_THE_USER({ getters, commit, dispatch }, userdata) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL



            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `${protocol}${base_url}/auth/token/login/`,
                    mode: 'cors',
                    data: {
                        'username': userdata.email,
                        'password': userdata.password,
                    }
                })
                    .then((response) => {
                        console.log(response)
                        commit('SET_AUTH_TOKEN', response.data.auth_token);
                        cookie.set('auth_token', getters.GET_AUTH_TOKEN);
                        cookie.set('auto_login', '');
                        cookie.set('auto_password', '')
                        if (userdata.remember_me) {
                            dispatch('PLACE_USER_AUTHORIZATION_DATA_IN_COOKIES');
                        }
                        router.push({ name: 'main' });

                        resolve('Успешно!')
                    })
                    .catch((error) => {
                        reject(error.response.data)
                    })
            })
        },

        SEND_A_USER_REGISTRATION_REQUEST_TO_THE_API({ getters }, userdata) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL


            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `${protocol}${base_url}/auth/users/`,
                    mode: 'cors',
                    data: {
                        'username': userdata.email,
                        'password': userdata.password,
                        'email': userdata.email,
                    }
                })
                    .then((response) => {
                        console.log('b')
                        console.log(response)
                        if (JSON.stringify(response.status) === '201') {
                            setTimeout(() => {
                                router.push({ name: 'authentication' });
                            }, 3000)

                        }
                        resolve('Вы успешно зарегистрировались!')
                    })
                    .catch((error) => {
                        reject(error.response.data)
                    })
            })




        },

        GET_ALL_USERS_FROM_API({ commit, getters }, value = '') {//если value = '', то вернутся все пользователи
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/profiles/`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        'value': value,
                    }
                }
            )
                .then((response) => {
                    commit('SET_ALL_USERS_LIST', response.data.response)
                })
                .catch(() => {
                    alert('Что-то пошло не так')
                })
        },

        SEND_FRIENDS_REQUEST_TO_USER({ getters }, username) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN
            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/friends/newrequest`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        'username': username,
                    }
                }
            )
                .then((response) => {
                    if (response.data.status == 'ok') {
                        console.log('Заявка успешно отправлена!')
                        websocket_connection.send(JSON.stringify({
                            type: 'friend',
                            action: 'send_request',
                            data: {
                                username: username,
                            }
                        })
                        )

                    } else {
                        alert(response.data.message)
                    }

                })
                .catch((error) => {
                    alert(error)
                })
        },

        GET_FRIEND_REQUESTS_FROM_API({ commit, getters }) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            console.log('a')

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/friends/newrequest`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        'username': '',
                    }
                }
            )
                .then((response) => {
                    console.log(response)
                    if (response.data.ok) {
                        console.log(response.data.requests)
                        commit('SET_FRIEND_REQUESTS_LIST', response.data.requests)
                    }
                })
                .catch((error) => {
                    alert('Не удалось получить список друзей', error)
                })
        },

        ACCEPT_A_FRIEND_REQUEST({ getters, dispatch }, username) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN
            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/friends/accept`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        'username': username,
                    }
                }
            )
                .then((response) => {

                    // Отправляем сообщение в websocket
                    websocket_connection.send(JSON.stringify({
                        type: 'friend',
                        action: 'add',
                        data: {
                            username: username,
                        }
                    })
                    )

                    console.log(response.data.ok)
                    if (response.data.ok == true) {
                        console.log('aboboa')
                        dispatch('ADD_USER_TO_FRIENDS_LIST_STORE', { friend: username })
                        dispatch('REMOVE_REQUEST_FROM_FRIEND_REQUESTS_LIST_STORE', { sender: username })
                    }

                })
                .catch((error) => {
                    console.error(error)
                })
        },

        GET_FRIENDS_LIST_FROM_API({ getters, commit }) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            axios(
                {
                    method: 'get',
                    url: `${protocol}${base_url}/api/friends/accept`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    }
                }
            )
                .then((response) => {
                    commit('SET_FRIENDS_LIST', response.data);
                })
                .catch(() => {
                    console.error('Не удалось получить список друзей')
                })
        },

        REMOVE_USER_FROM_FRIENDS_LIST_API({ getters, dispatch }, username) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN
            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/friends/remove`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        'username': username,
                    }
                }
            )
                .then((response) => {
                    if (response.data.status == 'ok') {
                        console.log('Успешно')

                        // Отправляем сообщение в websocket
                        websocket_connection.send(JSON.stringify({
                            type: 'friend',
                            action: 'remove',
                            data: {
                                username: username,
                            }
                        })
                        )
                        dispatch('REMOVE_USER_FROM_FRIENDS_LIST_STORE', { friend: username })

                    } else {
                        alert(response.data.message)
                    }
                })
                .catch((error) => {
                    console.error(error.response.data);
                })
        },

        GET_USER_CHATS_LIST_FROM_API({ getters, commit }, chat_name = '') {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/chat/get`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        chat_name: chat_name,
                    }

                }
            )
                .then((response) => {
                    let chats_list = []
                    let result = response.data;
                    for (let i in result) {
                        chats_list.push(result[i]);
                    }
                    commit('SET_CHATS_LIST', chats_list);
                })
                .catch(() => {
                    alert('Ошибка запроса к серверу');
                })
        },

        GET_ALL_MESSAGES_FROM_API({ getters, commit }, configurations) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN



            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `${protocol}${base_url}/api/message/get`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        chat_id: configurations.chat_id,
                        check_updates: false,
                    },

                })
                    .then((response) => {
                        let result = response.data.messages;
                        //если есть новое сообщение
                        if (result) {
                            let messages = []
                            for (let i in result) {
                                messages.push(result[i]);
                            }
                            commit('SET_MESSAGES_LIST', messages)



                            //запоминаем свой id
                            commit('SET_USERNAME', response.data.me)
                        }

                        //Если есть сообщение об ошибке, вызываем исключение
                        let error_text = response.data.error
                        if (error_text){
                            throw new Error(error_text)
                        }

                        resolve(true)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        GET_NEW_MESSAGES_FROM_API({ getters, commit, dispatch }, configurations) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN


            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `${protocol}${base_url}/api/message/get`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        chat_id: configurations.chat_id,
                        check_updates: true,
                    },

                })
                    .then((response) => {
                        let result = response.data.messages;
                        //если есть новое сообщение
                        if (result.length) {
                            let messages = []
                            for (let i in result) {
                                messages.push(result[i]);
                            }

                            for (let i in messages) {
                                messages[i].you_read = false
                                console.log(messages[i])
                                dispatch('ADD_MESSAGE_TO_MESSAGES_LIST_STORE', messages[i])
                            }

                            //запоминаем свой id
                            commit('SET_USERNAME', response.data.me)
                        }
                        resolve(true)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        POST_NEW_MESSAGE_TO_API({ getters, dispatch }, configurations) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN
            let websocket_connection = getters.GET_WEBSOCKET_CONNECTION


            return new Promise((resolve, reject) => {
                axios(
                    {
                        method: 'post',
                        url: `${protocol}${base_url}/api/message/post`,
                        mode: 'cors',
                        headers: {
                            Authorization: `Token ${auth_token}`,
                        },
                        data: {
                            chat_id: configurations.chat_id,
                            content: configurations.content,
                        },

                    }
                )
                    .then((request) => {
                        let message = request.data
                        //это сообзение сразу прочитанно нами
                        message.you_read = true
                        dispatch('ADD_MESSAGE_TO_MESSAGES_LIST_STORE', request.data)
                        
                        //но не прочитанно тем, кому мы его отправляем по вебсокетам
                        websocket_connection.send(JSON.stringify({
                            type: 'message',
                            action: 'send',
                            data: {
                                message: message,
                            }
                        }))

                        resolve('Успешно!')
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        ADD_MESSAGE_TO_MESSAGES_LIST_STORE({ getters }, message) {
            let messages_list = getters.GET_MESSAGES_LIST

            messages_list.push(message)
        },

        MARK_THE_MESSAGE_AS_READ_API({ getters }, message) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

            axios(
                {
                    method: 'post',
                    url: `${protocol}${base_url}/api/message/read`,
                    mode: 'cors',
                    headers: {
                        Authorization: `Token ${auth_token}`,
                    },
                    data: {
                        message_id: message.message_id,
                    }

                }
            )
                .then((response) => {
                    if (response.status == 200) {
                        message.you_read = true
                    }
                })
                .catch(() => {
                    console.error('Не удалось прочитать сообщение')
                })
        }


    },
})

let a = {
    state: {
        user: {
            token: '',
            additional_data: {
                name: '',
                status: '',
                experience: '',
                sex: '',
                date_of_birth: '',
                date_of_registration: '',
            }
        },



        data: {
            user: 'user',
            websocket_connection: false,
            friends: {
                friends: [],
                friend_requests: []
            }
        },
        auth_token: '',
        protocol: 'http://',
        base_url: 'localhost:8000',
    },
    getters: {},
    actions: {},
    mutations: {}
}

console.log(a)


import { createStore } from "vuex";
import axios from "axios";
import router from '../router';

export default createStore({
    state: {
        user: {
            auth_token: '',
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

        SET_ALL_USERS_LIST(state, all_users_list) {
            state.interaction_with_users.users = all_users_list
        },

        SET_FRIENDS_LIST(state, friends_list) {
            state.interaction_with_users.friends = friends_list
        },

        SET_FRIEND_REQUESTS_LIST(state, friend_requests_list) {
            state.interaction_with_users.friend_requests = friend_requests_list
        },

        REMOVE_USER_FROM_FRIENDS_LIST_STORE(state, element) {
            let friends_list = state.interaction_with_users.friends

            for (let list_el of friends_list) {
                if (list_el.friend == element.friend) {
                    const index = friends_list.indexOf(list_el)
                    friends_list.splice(index, 1);
                }
            }

        },

        ADD_USER_TO_FRIENDS_LIST_STORE(state, element) {
            let friends_list = state.interaction_with_users.friends

            friends_list.push(element)

        },

        ADD_REQUEST_TO_FRIEND_REQUESTS_LIST_STORE(state, element) {
            let friend_requsets_list = state.interaction_with_users.friend_requests

            friend_requsets_list.push(element)

        },

        REMOVE_REQUEST_FROM_FRIEND_REQUESTS_LIST_STORE(state, element) {
            let friend_requests_list = state.interaction_with_users.friend_requests


            for (let list_el of friend_requests_list) {
                if (list_el.friend == element.friend) {
                    const index = friend_requests_list.indexOf(list_el)
                    friend_requests_list.splice(index, 1);
                }
            }

        },


    },



    actions: {
        GET_ADDITIONAL_USER_DATA_FROM_API({ commit, getters }) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

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
                })
                .catch((error) => {
                    throw new Error('Сould not get data from the server', { cause: error })
                })
        },

        POST_ADDITIONAL_USER_DATA_TO_API({ getters }, additional_user_data) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL
            let auth_token = getters.GET_AUTH_TOKEN

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
                .then((response) => {
                    let data = response.data.user_data
                    console.log(data)

                })
                .catch((error) => {
                    throw new Error('Failed to establish a connection with the server', { cause: error })
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

        SEND_A_USER_REGISTRATION_REQUEST_TO_THE_API({ getters }, component) {
            let protocol = getters.GET_PROTOCOL
            let base_url = getters.GET_BASE_URL

            component.enable_preloader();

            console.log(component.email)


            axios({
                method: 'post',
                url: `${protocol}${base_url}/auth/users/`,
                mode: 'cors',
                data: {
                    'username': component.email,
                    'password': component.password,
                    'email': component.email,
                }
            })
                .then((response) => {
                    console.log(response)
                    if (JSON.stringify(response.status) === '201') {
                        component.status_info = 'Вы успешно зарегистрировались!';
                        setTimeout(() => {
                            router.push({ name: 'authentication' });
                        }, 3000)

                    }

                })
                .catch((error) => {
                    component.status_info = error.response.data;
                })

            component.disable_preloader();
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

        ACCEPT_A_FRIEND_REQUEST({ getters, commit }, username) {
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
                        commit('ADD_USER_TO_FRIENDS_LIST_STORE', { friend: username })
                        commit('REMOVE_REQUEST_FROM_FRIEND_REQUESTS_LIST_STORE', { sender: username })
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

        REMOVE_USER_FROM_FRIENDS_LIST_API({ getters, commit }, username) {
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
                        commit('REMOVE_USER_FROM_FRIENDS_LIST_STORE', { friend: username })

                    } else {
                        alert(response.data.message)
                    }
                })
                .catch((error) => {
                    console.error(error.response.data);
                })
        },


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


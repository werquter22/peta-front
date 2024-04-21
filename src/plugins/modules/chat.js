import getRequests from '../requests/getRequests.js'
import postRequest from '../requests/postRequest.js'
import getRequest from '../requests/getRequest.js'
import axios from '../axios.js'

export default {
    actions: {
        fetchChats(context, userName) {
            let chatUrl = ''

            if (userName) {
                chatUrl = '?userName=' + userName
            }

            return getRequests('/chats' + chatUrl, 'updateChats', context)
        },
        fetchChat(context, id) {
            return new Promise((resolve, reject) => {
                axios.get('/chats/' + id, 'updateChat', context)
                    .then((response) => {
                        console.log(response)

                        let chat = {
                            id: response.data.id,
                            user: response.data.user,
                            messages: response.data.messages['hydra:member']
                        }

                        context.commit('updateChat', chat)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
        pushChat(context, chat) {
            return postRequest('/chats', chat, 'updateChat', context)
        },
    },

    mutations: {
        updateChats(state, chats) {
            state.chats = chats
        },
        updateChat(state, chat) {
            state.chat = chat
        },
    },

    state: {
        chats: {
            models: [],
            totalItems: 0
        },
        chat: {
            id: null,
            user: {
                id: null,
                userName: null,
                image: {
                    contentUrl: null
                }
            },
            messages: []
        },
    },

    getters: {
        getChats(state) {
            return state.chats
        },
        getChat(state) {
            return state.chat
        },
        getChatMessages(state) {
            return state.chat.messages
        },
    }
}

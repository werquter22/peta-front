import getRequests from '../requests/getRequests.js'
import postRequest from '../requests/postRequest.js'

export default {
    actions: {
        fetchMessages(context, chatId) {
            return getRequests('/messages?chat=' + chatId, 'updateMessages', context)
        },
        pushMessage(context, message) {
            return postRequest('/messages', message, 'updateMessage', context)
        },
    },

    mutations: {
        updateMessages(state, messages) {
            state.messages = messages
        },
        updateMessage() {},
    },

    state: {
        messages: {
            models: [],
            totalItems: 0
        },
    },

    getters: {
        getMessages(state) {
            return state.messages.models.reverse()
        },
    }
}

import postRequest from '../requests/postRequest.js'

export default {
    actions: {
        pushPicture(context, data) {
            return postRequest('/media_objects', data, 'updatePicture', context)
        },
    },

    mutations: {
        updatePicture(state, data) {
            state.data = data
        }
    },

    state: {
        data: null
    },
    getters: {
        getPicture(state) {
            return state.data
        }
    }
}

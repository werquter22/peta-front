import getRequests from '../requests/getRequests.js'

export default {
    actions: {
        fetchServices(context) {
            return getRequests('/services', 'updateServices', context)
        },
    },

    mutations: {
        updateServices(state, services) {
            state.services = services
        },
    },

    state: {
        services: {
            models: [],
            totalItems: 0
        },
    },

    getters: {
        getServices(state) {
            return state.services.models
        },
    }
}

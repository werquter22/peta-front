import getRequests from '../requests/getRequests.js'
import getRequest from '../requests/getRequest.js'

export default {
    actions: {
        fetchCategories(context) {
            return getRequests('/categories', 'updateCategories', context)
        },
        fetchCategory(context, id) {
            return getRequest('/categories/' + id, 'updateCategory', context)
        },
    },

    mutations: {
        updateCategories(state, categories) {
            state.categories = categories
        },
        updateCategory(state, category) {
            state.category = category
        },
    },

    state: {
        categories: {
            models: [],
            totalItems: 0
        },
        category: {
            id: null,
            name: null,
            description: null
        },
    },

    getters: {
        getCategories(state) {
            return state.categories
        },
        getCategory(state) {
            return state.category
        },
    }
}

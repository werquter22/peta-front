import getRequests from '../requests/getRequests.js'
import postRequest from '../requests/postRequest.js'
import putRequest from '../requests/putRequest.js'

export default {
    actions: {
        fetchOrders(context, filterProps = {}) {
            let orderUrl = ''

            if (filterProps.employee) {
                orderUrl += '&employee=' + filterProps.employee
            }

            if (filterProps.service) {
                orderUrl += '&service=' + filterProps.service
            }

            if (filterProps.createdBy) {
                orderUrl += '&createdBy=' + filterProps.createdBy
            }

            if (filterProps.username) {
                orderUrl += '&username=' + filterProps.username
            }

            return getRequests('/orders?page=' + filterProps.page + orderUrl, 'updateOrders', context)
        },
        fetchTodayOrders(context, filterProps = {}) {
            let orderUrl = ''

            if (filterProps.employee) {
                orderUrl = '?employee=' + filterProps.employee
            }

            if (filterProps.username) {
                orderUrl += '&username=' + filterProps.username
            }

            return getRequests('/orders/today' + orderUrl, 'updateTodayOrders', context)
        },
        pushOrder(context, order) {
            return postRequest('/orders', order, 'empty', context)
        },
        putOrder(context, order) {
            return putRequest('/orders/' + order.id, order, 'empty', context)
        },
    },

    mutations: {
        updateOrders(state, orders) {
            state.orders = orders
        },
        updateTodayOrders(state, todayOrders) {
            state.todayOrders = todayOrders
        },
        empty() {},
    },

    state: {
        orders: {
            models: [],
            totalItems: 0,
            itemsPerPage: 0
        },
        todayOrders: {
            models: [],
            totalItems: 0
        },
    },

    getters: {
        getOrders(state) {
            return state.orders
        },
        getTodayOrders(state) {
            return state.todayOrders
        },
    }
}

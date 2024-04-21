import getRequests from '../requests/getRequests.js'
import getRequest from '../requests/getRequest.js'
import postRequest from '../requests/postRequest.js'
import putRequest from '../requests/putRequest.js'
import deleteRequest from '../requests/deleteRequest.js'

export default {
    actions: {
        fetchEmployees(context, filterProps = {}) {
            let employeeUrl = ''

            if (filterProps.userName) {
                employeeUrl += '&userName=' + filterProps.userName
            }

            if (filterProps.service) {
                employeeUrl += '&service=' + filterProps.service
            }

            if (filterProps.clinic) {
                employeeUrl += '&clinic=' + filterProps.clinic
            }

            return getRequests('/employees?page=' + filterProps.page + employeeUrl, 'updateEmployees', context)
        },
        fetchEmployee(context, id) {
            return getRequest('/employees/' + id, 'updateEmployee', context)
        },
        pushEmployee(context, employee) {
            return postRequest('/employees', employee, 'updateEmployee', context)
        },
        putEmployee(context, employee) {
            return putRequest('/employees/' + employee.id, employee, 'updateEmployee', context)
        },
        deleteEmployee(context, id) {
            return deleteRequest('/employees/' + id, 'updateEmployee', context)
        },
    },

    mutations: {
        updateEmployees(state, employees) {
            state.employees = employees
        },
        updateEmployee(state, employee) {
            state.employee = employee
        },
    },

    state: {
        employees: {
            models: [],
            totalItems: 0,
            itemsPerPage: 0
        },
        employee: {
            id: null,
            user: {
                id: null,
                userName: null,
                phone: null,
                image: {
                    id: null,
                    contentUrl: null
                }
            },
           service: {
                id: null,
                name: null
           },
            clinic: {
                id: null,
                name: null
            },
            price: null
        },
    },

    getters: {
        getEmployees(state) {
            return state.employees
        },
        getEmployee(state) {
            return state.employee
        },
    }
}

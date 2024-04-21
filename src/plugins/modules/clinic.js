import getRequests from '../requests/getRequests.js'
import getRequest from '../requests/getRequest.js'

export default {
    actions: {
        fetchClinics(context, categoryId = 0) {
            let clinicUrl = ''

            if (categoryId) {
                clinicUrl = '?category=' + categoryId
            }

            return getRequests('/clinics' + clinicUrl, 'updateClinics', context)
        },
        fetchClinic(context, id) {
            return getRequest('/clinics/' + id, 'updateClinic', context)
        },
    },

    mutations: {
        updateClinics(state, clinics) {
            state.clinics = clinics
        },
        updateClinic(state, clinic) {
            state.clinic = clinic
        },
    },

    state: {
        clinics: {
            models: [],
            totalItems: 0
        },
        clinic: {
            id: null,
            name: null,
            phone: null,
            address: null,
            description: null,
            image: {
                id: null,
                contentUrl: null
            },
            category: {
                id: null,
                name: null
            }
        },
    },

    getters: {
        getClinics(state) {
            return state.clinics
        },
        getClinic(state) {
            return state.clinic
        },
    }
}

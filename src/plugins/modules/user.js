import postRequest from "../requests/postRequest";
import getRequest from "../requests/getRequest";
import putRequest from "../requests/putRequest";

export default {
    actions: {
        fetchToken(context, data) {
            return postRequest('/users/auth', data, 'updateToken', context)
        },
        refreshToken(context, data) {
            return postRequest('/users/auth/refreshToken', {refreshToken: data}, 'updateToken', context)
        },
        fetchAboutMe(context){
            return postRequest('/users/about_me', {}, 'updateUser', context)
        },
        pushUser(context, data) {
            return postRequest('/users', data, 'updateUser', context)
        },
        fetchIsUniqueUsername(context, data) {
            return postRequest('/users/is_unique_username', data, 'updateIsUniqueUsername', context)
        },
        changeUser(context, data) {
            return putRequest('/users/' + data.id, data, 'updateUser', context)
        },
    },

    mutations: {
        updateToken(state, tokens) {
            localStorage.setItem('accessToken', tokens.accessToken)
            localStorage.setItem('refreshToken', tokens.refreshToken)

            state.accessToken = tokens.accessToken
            state.refreshToken = tokens.refreshToken
        },
        updateUser(state, user) {
            state.user = user
        },
        clearTokens(state) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            state.accessToken = localStorage.getItem('accessToken')
            state.refreshToken = localStorage.getItem('refreshToken')
        },
        updateIsUniqueUsername(state, data) {
            state.isUnique = data.isUnique
        },
    },

    state: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),

        user: {
            id: null,
            userName: null,
            phone: null,
            roles: [],
        },

        isUnique: null,
    },

    getters: {
        getAccessToken(state) {
            return state.accessToken
        },
        getRefreshToken(state) {
            return state.refreshToken
        },
        isAuthorized(state) {
            return state.accessToken !== null
        },
        getUser(state) {
            return state.user
        },
        getUserRoles(state) {
            return state.user.roles
        },
        getIsUniqueUsername(state) {
            return state.isUnique
        },
    }
}

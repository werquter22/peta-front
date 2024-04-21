import axios from "axios"
import store from "./store.js"

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL + '/api'
axios.defaults.headers.post['Content-Type'] = 'application/ld+json'
axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json'

axios.interceptors.request.use((config) => {
  if (config.url !== '/users/auth') {
    config.headers.Authorization = 'bearer ' + store.getters.getAccessToken
  }

  return config
})
export default axios

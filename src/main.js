import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./plugins/router.js"
import i18n from "./locales/i18n.js"
import store from './plugins/store.js'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const options = {
    position: 'top-center',
    timeout: 2000,
}

createApp(App)
    .use(router)
    .use(i18n)
    .use(store)
    .use(Toast, options)
    .mount('#app')

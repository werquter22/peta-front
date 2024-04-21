import {createStore} from 'vuex'
import user from './modules/user.js'
import popup from './helpers/popup.js'
import category from './modules/category.js'
import employee from './modules/employee.js'
import clinic from './modules/clinic.js'
import order from './modules/order.js'
import service from './modules/service.js'
import chat from './modules/chat.js'
import message from './modules/message.js'
import mediaObject from './modules/mediaObject.js'

export default createStore({
    modules: {
        user,
        popup,
        category,
        employee,
        clinic,
        order,
        service,
        chat,
        message,
        mediaObject
    }
})

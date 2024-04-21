import {createRouter, createWebHistory} from "vue-router";
import store from "./store"

const ifNotAuthorized = (to, from, next) => {
    if (store.getters.isAuthorized) {
        next('/')
    } else {
        next()
    }
}

const ifAuthorized = (to, from, next) => {
    if (store.getters.isAuthorized) {
        next()
    } else {
        next('/auth?previousRoute=' + to.fullPath)
    }
}

const ifAdmin = (to, from, next) => {
    if (store.getters.isAuthorized) {
        store.dispatch('fetchAboutMe')
            .then(() => {
                if (store.getters.getUser.roles.includes('ROLE_ADMIN')) {
                    next()
                } else {
                    next('/')
                }
            })
            .catch(() => {
                next('/')
            });
    } else {
        next('/')
    }
}

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/HomePage.vue')
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('../pages/AuthPage.vue'),
            beforeEnter: ifNotAuthorized,
        },
        {
            path: '/categories',
            name: 'categories',
            component: () => import('../pages/AllCategories.vue'),
        },
        {
            path: '/doctors/:id?',
            name: 'doctors',
            component: () => import('../pages/AllDoctors.vue'),
        },
        {
            path: '/clinics',
            name: 'clinics',
            component: () => import('../pages/AllClinics.vue'),
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../pages/ContactPage.vue'),
            beforeEnter: ifAuthorized,
        },
        {
            path: '/category/:id',
            component: () => import('../pages/CategoryPage.vue'),
        },
        {
            path: '/doctor/:id',
            component: () => import('../pages/DoctorPage.vue'),
        },
        {
            path: '/clinic/:id',
            component: () => import('../pages/ClinicPage.vue'),
        },
        {
            path: '/orders/:id?',
            component: () => import('../pages/OrdersPage.vue'),
            beforeEnter: ifAuthorized,
        },
        {
            path: '/employees/:id?',
            component: () => import('../pages/AllEmployeesPage.vue'),
            beforeEnter: ifAdmin,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
        return {
            top: 0,
            behavior: 'smooth'
        }
    }
})
<template>
    <HeaderComponent class="sticky top-0 z-40" />
    <AddOrderComponent ref="deleteRef" />

    <div v-if="!isLoading" class="container mx-auto lg:px-20 px-4 my-10">
        <div class="col-span-1 translate-x-0 translate-y-0 opacity-100 transition-all duration-500 group mx-auto">
            <div class="w-full md:w-96 overflow-hidden">
                <img :src="url + doctor.user.image.contentUrl" alt="doctor" class="object-cover w-full">
            </div>
        </div>
        <p v-intersection-observer="updateTextAnimation"
           class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('doctor') }}: {{ doctor.user.userName }}
        </p>
        <p v-intersection-observer="updateTextAnimation"
           class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('service') }}: {{ doctor.service.name }}
        </p>
        <p v-intersection-observer="updateTextAnimation"
           class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('price') }}: {{ useFormattedSum(doctor.price) }}
        </p>
        <p v-intersection-observer="updateTextAnimation"
           class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('phone') }}: {{ doctor.user.phone }}
        </p>
        <p v-intersection-observer="updateTextAnimation"
           class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('clinic') }}: {{ doctor.clinic.name }}
        </p>
        <div v-if="!isAdmin && !isDoctor">
            <button
                class="bg-[#CD4F00] hover:bg-[#FF8A41] text-white py-1.5 px-3 w-fit transition-all duration-200 rounded-xl my-5 ms-2"
                @click="booking(doctor['@id'])"
            >
                {{ $t('booking') }}
            </button>
            <button
                class="bg-[#CD4F00] hover:bg-[#FF8A41] text-white py-1.5 px-3 w-fit transition-all duration-200 rounded-xl my-5 ms-2"
                @click="callHome(doctor['@id'])"
            >
                {{ $t('callHome') }}
            </button>
        </div>

        <div class="bg-white rounded-lg shadow-[4px_10px_10px_0_#DCE7FF] mt-5">
            <div class="rounded-tr-lg rounded-tl-lg px-4 bg-[#F5F5F5] flex py-2 items-center flex-wrap gap-5">
                <div class="flex items-center w-full flex-wrap gap-5">
                    <h2 class="font-semibold text-black mr-6">{{ $t('todayQueues') }}</h2>
                    <div class="w-full lg:w-fit flex bg-white px-2.5 items-center gap-3 py-1.5 rounded-lg">
                        <label class="cursor-pointer" for="search">
                            <svg
                                fill="none"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="#535461"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                />
                            </svg>
                        </label>
                        <input
                            id="search"
                            v-model="filterProps.username"
                            :placeholder="$t('search')"
                            class="w-full text-sm md:text-base outline-none bg-white"
                            type="text"
                            @input="searchByUsername"
                        />
                    </div>
                </div>
            </div>

            <div v-if="orders.totalItems > 0" class="overflow-x-auto px-4">
                <ListOrders :is-doctor="isEmployee" :orders="orders.models" @update:modelValue="updateModelValue" />
            </div>
        </div>
        <div v-if="orders.totalItems === 0" class="text-center mt-4 font-bold">
            {{ $t('listIsEmpty') }}
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useStore } from 'vuex'
import HeaderComponent from '../components/HeaderComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import ListOrders from '../components/ListOrders.vue'
import useFormattedSum from '../plugins/helpers/useFormattedSum.js'
import AddOrderComponent from '../components/PopUpComponents/AddOrderComponent.vue'

const router = useRouter()
const isLoading = ref(true)
const url = ref(import.meta.env.VITE_APP_API_URL)
const store = useStore()
const route = useRoute()
const doctor = computed(() => store.getters.getEmployee)
const orders = computed(() => store.getters.getTodayOrders)
const isAdmin = ref(false)
const isDoctor = ref(false)
const isEmployee = ref(false)
const deleteRef = ref(null)

const updateTextAnimation = ([{ isIntersecting, target }]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const filterProps = reactive({
    employee: route.params.id,
    username: ''
})

const order = reactive({
    employee: null,
    isHome: false
})

const booking = (id) => {
    if (store.getters.isAuthorized) {
        order.employee = id
        order.isHome = false
        deleteRef.value?.openPopUp(order)
    } else {
        router.push('/auth?previousRoute=/doctor/' + route.params.id)
    }
}

const callHome = (id) => {
    if (store.getters.isAuthorized) {
        order.employee = id
        order.isHome = true
        deleteRef.value?.openPopUp(order)
    } else {
        router.push('/auth?previousRoute=/doctor/' + route.params.id)
    }
}

const searchByUsername = () => {
    store.dispatch('fetchTodayOrders', filterProps)
}

const updateModelValue = (order) => {
    store.dispatch('putOrder', order)
        .then(() => {
            store.dispatch('fetchTodayOrders', filterProps)
        })
}

onMounted(async () => {
    await store.dispatch('fetchEmployee', route.params.id)
    await store.dispatch('fetchTodayOrders', filterProps)

    if (store.getters.isAuthorized) {
        await store.dispatch('fetchAboutMe')
        isAdmin.value = store.getters.getUserRoles.includes('ROLE_ADMIN')
        isDoctor.value = store.getters.getUserRoles.includes('ROLE_DOCTOR')
        isEmployee.value = store.getters.getEmployee.user.id === store.getters.getUser.id
    }

    isLoading.value = false
})
</script>

<style scoped>

</style>

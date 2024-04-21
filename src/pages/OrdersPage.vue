<template>
    <HeaderComponent class="sticky top-0 z-40" />

    <div class="rounded-lg flex-col flex bg-[#F8FCFF] h-[calc(100vh_-_80px)] p-4 md:p-9 w-full overflow-x-auto" v-if="!isLoading">
        <div class="text-center">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold mt-5 mb-10 text-gold px-4">
                {{ isAdmin ? $t('orders') : $t('myOrders') }}
            </h2>
        </div>

        <div class="bg-white rounded-lg shadow-[4px_10px_10px_0_#DCE7FF]">
            <div class="rounded-tr-lg rounded-tl-lg px-4 bg-[#F5F5F5] flex py-2 items-center flex-wrap gap-5">
                <div class="flex items-center w-full flex-wrap gap-5">
                    <h2 class="font-semibold text-black mr-6">{{ isAdmin ? $t('orders') : $t('myOrders') }}</h2>
                    <div
                        v-if="isAdmin || isDoctor"
                        class="w-full lg:w-fit flex bg-white px-2.5 items-center gap-3 py-1.5 rounded-lg"
                    >
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
                            class="w-full text-sm md:text-base outline-none bg-white"
                            :placeholder="$t('search')"
                            type="text"
                            v-model="filterProps.username"
                            @input="searchByUsername"
                        />
                    </div>
                    <SelectByService
                        :select-items="services"
                        @update:modelValue="searchByService"
                        v-if="!isDoctor"
                    />
                </div>
            </div>

            <div class="overflow-x-auto px-4" v-if="orders.totalItems > 0">
                <ListOrders :orders="orders.models" :is-doctor="isDoctor" @update:modelValue="updateModelValue"/>
            </div>
        </div>
        <div class="text-center mt-4 font-bold" v-if="orders.totalItems === 0">
            {{ $t('listIsEmpty') }}
        </div>

        <PaginationRow
            v-if="pagesCount > 1"
            :items-per-page="orders.itemsPerPage"
            :total-items="orders.totalItems"
            :initial-current-page="+filterProps.page"
            :baseUrl="'/orders/'"
            class="mt-11 mb-6"
            @update-page="fetchNewPage"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import ListOrders from '../components/ListOrders.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import SelectByService from '../components/UI/SelectByService.vue'
import { vIntersectionObserver } from '@vueuse/components'
import PaginationRow from '../components/UI/PaginationRow.vue'
import { useRoute } from 'vue-router'
import router from '../plugins/router.js'

const route = useRoute();
const store = useStore()
const orders = computed(() => store.getters.getOrders)
const services = computed(() => store.getters.getServices)
const isLoading = ref(true);
const isAdmin = ref(false)
const isDoctor = ref(false)
const pagesCount = ref(1)

const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const updateModelValue = (order) => {
    store.dispatch('putOrder', order)
        .then(() => {
            store.dispatch('fetchOrders', filterProps)
        })
}

const filterProps = reactive({
    page: route.params.id,
    employee: 0,
    service: 0,
    createdBy: 0,
    username: ''
})

const fetchNewPage = (pageNumber) => {
    if (pageNumber > 0) {
        filterProps.page = pageNumber
    } else {
        filterProps.page = '1'
        router.push('/orders/1')
    }
}

const searchByUsername = () => {
    filterProps.page = '1'
    router.push('/orders/1')
    store.dispatch('fetchOrders', filterProps)
}

const searchByService = (service) => {
    filterProps.page = '1'
    filterProps.service = service
    router.push('/orders/1')
    store.dispatch('fetchOrders', filterProps)
}

onMounted(async () => {
    fetchNewPage(route.params.id)
    await store.dispatch('fetchOrders', filterProps)
    pagesCount.value = Math.ceil(orders.value.totalItems / orders.value.itemsPerPage)
    await store.dispatch('fetchServices')
    await store.dispatch('fetchAboutMe')
    isAdmin.value = store.getters.getUserRoles.includes('ROLE_ADMIN')
    isDoctor.value = store.getters.getUserRoles.includes('ROLE_DOCTOR')
    isLoading.value = false
})

watch(() => filterProps.page, () => {
    store.dispatch('fetchOrders', filterProps)
})
</script>

<style scoped>

</style>

<template>
    <HeaderComponent class="sticky top-0 z-40" />

    <div class="rounded-lg flex-col flex bg-[#F8FCFF] h-[calc(100vh_-_80px)] p-4 md:p-9 w-full overflow-x-auto" v-if="!isLoading">
        <div class="text-center">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold mt-5 mb-10 text-gold px-4">
                {{ $t('doctors') }}
            </h2>
        </div>

        <div class="bg-white rounded-lg shadow-[4px_10px_10px_0_#DCE7FF]">
            <div class="rounded-tr-lg rounded-tl-lg px-4 bg-[#F5F5F5] flex py-2 items-center flex-wrap gap-5">
                <div class="flex items-center w-full flex-wrap gap-5">
                    <h2 class="font-semibold text-black mr-6">{{ $t('doctors') }}</h2>
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
                            v-model="filterProps.userName"
                            :placeholder="$t('search')"
                            class="w-full text-sm md:text-base outline-none bg-white"
                            type="text"
                            @input="searchByName"
                        />
                    </div>
                    <SelectByService
                        :select-items="services"
                        @update:modelValue="searchByService"
                    />
                    <div class="ml-auto flex self-end items-center justify-end gap-2">
                        <button @click="openPopup('addDoctor')" class="hover:opacity-70 active:scale-90">
                            <svg
                                fill="none"
                                height="44"
                                viewBox="0 0 44 44"
                                width="44"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_131_70)">
                                    <circle cx="22" cy="21" fill="#008BD0" r="16" />
                                </g>
                                <path
                                    d="M22 14V28M15 21H29"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                />
                                <defs>
                                    <filter
                                        id="filter0_d_131_70"
                                        color-interpolation-filters="sRGB"
                                        filterUnits="userSpaceOnUse"
                                        height="44"
                                        width="44"
                                        x="0"
                                        y="0"
                                    >
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            result="hardAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        />
                                        <feMorphology
                                            in="SourceAlpha"
                                            operator="dilate"
                                            radius="1"
                                            result="effect1_dropShadow_131_70"
                                        />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="2.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                        />
                                        <feBlend
                                            in2="BackgroundImageFix"
                                            mode="normal"
                                            result="effect1_dropShadow_131_70"
                                        />
                                        <feBlend
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_131_70"
                                            mode="normal"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto px-4" v-if="employees.totalItems > 0">
                <ListEmployees :employees="employees.models"/>
            </div>
        </div>
        <div class="text-center mt-4 font-bold" v-if="employees.totalItems === 0">
            {{ $t('listIsEmpty') }}
        </div>

        <PaginationRow
            v-if="pagesCount > 1"
            :items-per-page="employees.itemsPerPage"
            :total-items="employees.totalItems"
            :initial-current-page="+filterProps.page"
            :baseUrl="'/employees/'"
            class="mt-11 mb-6"
            @update-page="fetchNewPage"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import ListEmployees from '../components/ListEmployees.vue'
import { useStore } from 'vuex'
import SelectByService from '../components/UI/SelectByService.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import { vIntersectionObserver } from '@vueuse/components'
import PaginationRow from '../components/UI/PaginationRow.vue'
import { useRoute } from 'vue-router'
import router from '../plugins/router.js'

const route = useRoute();
const store = useStore();
const employees = computed(() => store.getters.getEmployees)
const services = computed(() => store.getters.getServices)
const isLoading = ref(true);
const pagesCount = ref(1)

const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const filterProps = reactive({
    page: route.params.id,
    service: 0,
    userName: ''
})

const fetchNewPage = (pageNumber) => {
    if (pageNumber > 0) {
        filterProps.page = pageNumber
    } else {
        filterProps.page = '1'
        router.push('/employees/1')
    }
}

const searchByName = () => {
    filterProps.page = '1'
    router.push('/employees/1')
    store.dispatch('fetchEmployees', filterProps)
}

const searchByService = (serviceId) => {
    filterProps.page = '1'
    filterProps.service = serviceId
    router.push('/employees/1')
    store.dispatch('fetchEmployees', filterProps)
}

const openPopup = content => {
    store.commit('open', content)
}

onMounted(async () => {
    fetchNewPage(route.params.id)
    await store.dispatch('fetchEmployees', filterProps)
    pagesCount.value = Math.ceil(employees.value.totalItems / employees.value.itemsPerPage)
    await store.dispatch('fetchServices')
    isLoading.value = false
})

watch(() => filterProps.page, () => {
    store.dispatch('fetchEmployees', filterProps)
})
</script>

<style scoped></style>
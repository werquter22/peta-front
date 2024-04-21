<template>
    <HeaderComponent class="sticky top-0 z-40" />

    <div class="container mx-auto lg:px-20 px-4">
        <div class="text-center">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold my-10 text-gold px-4">
                {{ clinic.name }}
            </h2>
        </div>
        <div class="col-span-1 translate-x-0 translate-y-0 opacity-100 transition-all duration-500 group">
            <div class="w-full md:w-80 overflow-hidden">
                <img :src="url + clinic.image.contentUrl" alt="doctor" class="object-cover w-full">
            </div>
        </div>
        <p v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('phone') }}: {{ clinic.phone }}
        </p>
        <p v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('address') }}: {{ clinic.address }}
        </p>
        <p v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ $t('category') }}: {{ clinic.category.name }}
        </p>
        <p v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4 mt-4">
            {{ clinic.description }}
        </p>

        <div class="text-center mb-16">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold my-10 text-gold px-4">
                {{ $t('doctors') }}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-12 gap-8">
                <div
                    v-intersection-observer="toggleClass"
                    v-for="doctor of doctors"
                    :key="doctor.id"
                    class="col-span-1 translate-x-0 translate-y-0 opacity-100 transition-all duration-500 group "
                >
                    <router-link :to="'/doctor/' + doctor.id">
                        <div class="w-full sm:h-40 md:h-52 overflow-hidden">
                            <img :src="url + doctor.user.image.contentUrl" alt="doctor" class="object-cover w-full">
                        </div>
                        <div class="flex flex-col gap-5 p-5 bg-[#222222] text-[#BBBBBB]">
                            <div class="text-2xl font-semibold">{{ doctor.user.userName }}</div>
                            <div class="text-sm leading-6 font-semibold">{{ doctor.service.name }}</div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useStore } from 'vuex'
import HeaderComponent from '../components/HeaderComponent.vue'
import { useRoute } from 'vue-router'

const toggleClass = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('card-animation') : target.classList.remove('card-animation')
}
const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const url = ref(import.meta.env.VITE_APP_API_URL);
const store = useStore();
const route = useRoute();
const clinic = computed(() => store.getters.getClinic)
const doctors = computed(() => store.getters.getEmployees.models)

onMounted(() => {
    store.dispatch('fetchClinic', route.params.id)
    store.dispatch('fetchEmployees', {page: 1, clinic: route.params.id})
})
</script>

<style scoped>

</style>

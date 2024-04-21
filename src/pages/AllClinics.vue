<template>
    <HeaderComponent class="sticky top-0 z-40" />

    <div class="container mx-auto lg:px-20 px-4">
        <div class="text-center mb-16">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold my-10 text-gold px-4">
                {{ $t('clinics')}}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-12 gap-8">
                <div
                    v-intersection-observer="toggleClass"
                    v-for="clinic of clinics"
                    :key="clinic.id"
                    class="col-span-1 translate-x-0 translate-y-0 opacity-100 transition-all duration-500 group "
                >
                    <router-link :to="'/clinic/' + clinic.id">
                        <div class="w-full sm:h-40 md:h-52 overflow-hidden">
                            <img :src="url + clinic.image.contentUrl" alt="doctor" class="object-cover w-full">
                        </div>
                        <div class="flex flex-col gap-5 p-5 bg-white text-[#222]">
                            <div class="text-2xl font-semibold line-clamp-2">{{ clinic.name }}</div>
                            <div class="leading-6 text-[#282828] line-clamp-3">{{ clinic.address }}</div>
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

const toggleClass = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('card-animation') : target.classList.remove('card-animation')
}
const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const url = ref(import.meta.env.VITE_APP_API_URL);
const store = useStore();
const clinics = computed(() => store.getters.getClinics.models)

onMounted(() => {
    store.dispatch('fetchClinics')
})
</script>

<style scoped>

</style>

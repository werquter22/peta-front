<template>
    <div class="container mx-auto lg:px-20 px-4">
        <div class="text-center mb-16">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold my-10 text-gold px-4">
                {{ $t('doctors') }}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-12 gap-8">
                <div
                    v-intersection-observer="toggleClass"
                    v-for="doctor of randomDoctors"
                    :key="doctor.id"
                    class="col-span-1 translate-x-0 translate-y-0 opacity-100 transition-all duration-500 group "
                >
                    <router-link :to="'/doctor/' + doctor.id">
                        <div class="w-full sm:h-40 md:h-52 overflow-hidden">
                            <img :src="url + doctor.user.image.contentUrl" alt="doctor" class="object-cover w-full" v-if="doctor.user.image">
                            <img src="/public/belijhalat.jpg" alt="doctor" class="object-cover w-full" v-else>
                        </div>
                        <div class="flex flex-col gap-5 p-5 bg-[#222222] text-[#BBBBBB]">
                            <div class="text-2xl font-semibold">{{ doctor.user.userName }}</div>
                            <div class="text-sm leading-6 font-semibold">{{ doctor.service.name }}</div>
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="w-full flex justify-end">
                <router-link
                    to="/doctors/1"
                    class="ml-auto hover:bg-gold hover:text-white transition-all duration-300 px-7 py-2 border-2 border-gold mt-5 text-lg font-normal rounded-xl"
                >
                    {{ $t('all') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useStore } from 'vuex'

const toggleClass = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('card-animation') : target.classList.remove('card-animation')
}
const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const url = ref(import.meta.env.VITE_APP_API_URL);
const store = useStore();
const doctors = computed(() => store.getters.getEmployees)

const randomDoctors = computed(() => {
    if (doctors.value.totalItems > 4) {
        let randomSortedDoctors = doctors.value.models
            .map(doctor => [Math.random(), doctor])
            .sort()
            .map(pair => pair[1]);
        return randomSortedDoctors.splice(0, 4);
    }
    return doctors.value.models;
});

onMounted(() => {
    store.dispatch('fetchEmployees', {page: 1})
})
</script>

<style scoped>
</style>
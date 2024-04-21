<template>
    <div class="container mx-auto lg:px-20 px-4">
        <div class="text-center mb-10">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold mt-20 mb-10 text-gold px-4">
                {{ $t('theBestForYou') }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8">
                <div
                    v-intersection-observer="toggleClass"
                    v-for="category of randomCategories"
                    :key="category.id"
                    class="card translate-x-0 translate-y-0 opacity-100 transition-all duration-500 flex border-2 mx-1 rounded-br-2xl border-gold p-5 relative col-span-1"
                >
                    <div class="relative text-white -top-8 border-4 border-white -left-8 rounded-tl-md rounded-br-md rounded-tr-xl rounded-bl-xl flex-none size-16 flex justify-center items-center bg-gold">
                        <FontAwesomeIcon
                            :icon="faFutbol"
                            class="text-[#FFE3D2]"
                            size="xl"
                        />
                    </div>
                    <router-link :to="'/category/' + category.id">
                        <div class="text-left text-[#282828] -ml-3">
                            <h2 class="text-lg font-semibold mb-1">{{ category.name }}</h2>
                            <p class="leading-6">{{ category.description }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="w-full flex justify-end">
            <router-link
                to="/categories"
                class="ml-auto hover:bg-gold hover:text-white transition-all duration-300 px-7 py-2 border-2 border-gold text-lg font-normal rounded-xl"
            >
                {{ $t('all') }}
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import { vIntersectionObserver } from '@vueuse/components'
import { useStore } from 'vuex'

const toggleClass = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('card-animation') : target.classList.remove('card-animation')
}
const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const store = useStore();
const categories = computed(() => store.getters.getCategories)

const randomCategories = computed(() => {
    if (categories.value.totalItems > 6) {
        let randomSortedCategories = categories.value.models
            .map(category => [Math.random(), category])
            .sort()
            .map(pair => pair[1]);
        return randomSortedCategories.splice(0, 6);
    }
    return categories.value.models;
});

onMounted(() => {
    store.dispatch('fetchCategories')
})
</script>

<style scoped>
</style>
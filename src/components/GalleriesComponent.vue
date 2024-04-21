<template>
    <div class="container mx-auto lg:px-20 px-4">
        <div class="text-center mb-16">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold mb-10 text-gold px-4">
                {{ $t('gallery') }}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-12 gap-8">
                <div
                    v-intersection-observer="toggleClass"
                    v-for="card of cards"
                    :key="card.id"
                    class="group col-span-1 translate-x-0 translate-y-0 opacity-100 transition-all duration-500 group "
                >
                    <div class="w-full relative after:absolute after:inset-0 after:border-b-4 after:border-gold cursor-pointer group-hover:before:bg-[#00000055] before:absolute before:inset-0 before:transition-all before:duration-200 " v-html="card.img"></div>
                    <div @click="openPopup(card.img)" class="text-gold border-2 size-16 flex items-center justify-center rounded-full border-[#ffffff90] opacity-0 cursor-pointer group-hover:opacity-100 transition-all duration-200 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <FontAwesomeIcon :icon="faEye" size="xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive} from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { vIntersectionObserver } from '@vueuse/components'
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons/faFacebookF";
import {faGooglePlusG} from "@fortawesome/free-brands-svg-icons/faGooglePlusG";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {useStore} from "vuex";

const cards = reactive([
    {
        id: 1,
        img: `<img src="/images/cat.JPG" alt="doctor" class="object-cover w-full">`,
    },
    {
        id: 2,
        img: `<img src="/images/cat2.JPG" alt="doctor" class="object-cover w-full">`,
    },
    {
        id: 3,
        img: `<img src="/images/doc_cat.JPG" alt="doctor" class="object-cover w-full">`,
    },
    {
        id: 4,
        img: `<img src="/images/doctors.jpeg" alt="doctor" class="object-cover w-full">`,
    },
    {
        id: 5,
        img: `<img src="/images/dog_cat_2.JPG" alt="doctor" class="object-cover w-full">`,
    },
    {
        id: 6,
        img: `<img src="/images/dog_doc_2.JPG" alt="doctor" class="object-cover w-full">`,
    },
    {
        id: 7,
        img: `<img src="/images/dog_doc.JPG" alt="doctor" class="object-cover w-full">`,
    },
    {
        id: 8,
        img: `<img src="/images/dog.JPG" alt="doctor" class="object-cover w-full">`,
    }
])
const toggleClass = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('card-animation') : target.classList.remove('card-animation')
}
const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const store = useStore()

const openPopup = content => {
    store.commit('openPopup', content)
}
</script>

<style scoped>
</style>
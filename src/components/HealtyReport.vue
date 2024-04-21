<template>
    <div class="container mx-auto lg:px-20 px-4 mt-48">
        <div class="text-center mb-16 mt-2">
            <h2 v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-5xl font-semibold mb-10 text-[#222] px-4">
                Healty Report
            </h2>
            <p v-intersection-observer="updateTextAnimation" class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-sm text-[#282828] px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus vitae massa
                <br />
                semper aliquam quis mattis quam.

            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 gap-8">
                <div
                    v-intersection-observer="toggleClass"
                    v-for="card of cards"
                    :key="card.id"
                    class="group flex flex-col items-center gap-5 col-span-1 translate-x-0 translate-y-0 opacity-100 transition-all duration-500 group "
                >
                    <div class="size-36 rounded-full border-4 border-gold"></div>
                    <div class="font-semibold">{{card.text}}</div>
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

const cards = reactive([
    {
        id: 1,
        text: 'Clients',
    },
    {
        id: 2,
        text: 'Trainer',
    },
    {
        id: 3,
        text: 'Programs',
    },
    {
        id: 4,
        text: 'Successes',
    }
])
const toggleClass = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('card-animation') : target.classList.remove('card-animation')
}
const updateTextAnimation = ([{isIntersecting, target}]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}
</script>

<style scoped>
</style>
<template>
    <HeaderComponent class="sticky top-0 z-40" v-if="$route.path === '/contact'"/>

    <div class="container mx-auto lg:px-20 px-4">
        <div class="text-center mb-16 mt-2.5">
            <h2 v-intersection-observer="updateTextAnimation"
                class="translate-x-0 translate-y-0 opacity-100 transition-all duration-500 text-animation text-4xl font-semibold my-10 text-gold px-4">
                {{ $t('contact') }}
            </h2>

            <div class="mt-12 p-4 lg:p-12 gap-8 lg:flex bg-gold ">
                <div class="px-4 text-[#222] text-left w-full lg:w-1/4 mb-5">
                    <div class="font-semibold text-2xl">Contact Info</div>
                    <div class="font-bold text-[15px] mt-3">Company name Petaclinics.uz.</div>
                    <div class="leading-7 mt-3">If you have any questions, write to the admin</div>
                </div>
                <form class="lg:grow px-4 flex flex-col gap-4" @submit.prevent="send">
                    <textarea
                        v-model="text"
                        :placeholder="$t('message')"
                        class="py-1.5 px-3 border-white border outline-0 focus:border-[#66afe9]"
                        rows="12"
                    ></textarea>
                    <button class="bg-[#CD4F00] hover:bg-[#FF8A41] text-white py-1.5 px-3 w-fit text-sm" :disabled="text === ''">{{ $t('send') }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { vIntersectionObserver } from '@vueuse/components'
import HeaderComponent from '../components/HeaderComponent.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const text = ref('')
const store = useStore()
const toast = useToast()
const { t } = useI18n()
const router = useRouter()

const updateTextAnimation = ([{ isIntersecting, target }]) => {
    !isIntersecting ? target.classList.add('animate-text') : target.classList.remove('animate-text')
}

const send = () => {
    if (store.getters.isAuthorized) {
        store.dispatch('pushChat', {user: '/api/users/1'})
            .then(() => {
                store.dispatch('pushMessage', {chat: store.getters.getChat['@id'], text: text.value})
                    .then(() => {
                        toast.success(t('messageSent'))
                        text.value = ''
                    })
            })
    } else {
        router.push('/auth')
    }
}
</script>

<style scoped>
</style>
<template>
    <div class="py-2.5 shadow-sm relative bg-white px-4">
        <div class="container mx-auto lg:px-12">
            <div class="flex gap-10 items-center container justify-between mx-auto ">
                <router-link to="/" class="h-14">
                    <img alt="logo" class="h-full" src="/images/logo3.png" />
                </router-link>
                <div class="hidden xl:flex gap-4 items-center">
                    <LanguageSwitcher/>
                    <router-link :to="{name: 'home'}" class="hover:text-gold transition-all duration-200 font-normal cursor-pointer">
                        {{ $t('home') }}
                    </router-link>
                </div>
                <button @click="isOpenMenu = !isOpenMenu" class="xl:hidden flex ml-auto items-center hover:bg-gray-200 px-2 py-1.5 transition-all duration-200">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.3 7.96667H26.6333M5.3 15.9667H26.6333M5.3 23.9667H26.6333" stroke="#535461" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <transition name="slide-fade-ttb">
                <div
                    @click.self="isOpenMenu = false"
                    v-show="isOpenMenu"
                    :class="
                        {
                            'w-full left-0 h-screen transition-all duration-200 transform-y-full border-t xl:border-none': isOpenMenu
                        }"
                    class="left-0 flex shadow-md items-start justify-between xl:hidden transition-all -transform-y-full duration-200 bg-[#00000099] absolute z-20 w-full h-0 top-full py-0">
                    <div class="w-full bg-white py-4">
                        <ul class="cursor-pointer flex flex-col w-full">
                            <router-link @click.self="isOpenMenu = false" :to="{name: 'home'}" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5">{{ $t('home') }}</router-link>
                        </ul>
                        <LanguageSwitcher class="mr-4 mt-2 mx-4"/>
                    </div>
                </div>
            </transition>
        </div>
    </div>
    <div class="container mx-auto px-5 lg:px-12 mt-36">
        <div class="flex bg-[#ebf2ff] rounded-xl">
            <ButtonComponent @click="isSignUp = true" class="px-4" :button-type="isSignUp ? 'white' : 'blue-light'" >{{ t('signUp') }}</ButtonComponent>
            <ButtonComponent @click="isSignUp = false" class="px-8"  :button-type="!isSignUp ? 'white' : 'blue-light'" >{{ t('login') }}</ButtonComponent>
        </div>
        <SignUp v-if="isSignUp" />
        <SignIn v-else/>
    </div>
</template>

<script setup>

import ButtonComponent from '../components/UI/ButtonComponent.vue'
import SignIn from '../components/SignIn.vue'
import { onMounted, ref } from 'vue'
import { useI18n} from 'vue-i18n'
import SignUp from '../components/SignUp.vue'
import LanguageSwitcher from '../components/UI/LanguageSwitcher.vue'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'

const route = useRoute();
const toast = useToast()
const { t } = useI18n()
const isSignUp = ref(false)
const isOpenMenu = ref(false)

onMounted(() => {
    if (route.query.previousRoute !== undefined) {
        toast.info(t('sorry'))
    }
})
</script>

<style scoped>

</style>

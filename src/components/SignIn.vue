<template>
    <form class="bg-[#ebf2ff] p-4 lg:p-[50px] my-auto mt-10 gap-5 flex flex-col rounded-xl" @submit.prevent="auth">
        <InputComponent
            v-model="form.userName"
            :placeholder="$t('userName')"
            valid
            is-email
        />
        <PasswordInput
            v-model="form.password"
            :placeholder="$t('password')"
            class="w-full mt-4"
            variant="password"
        />
        <button
            class="bg-[#CD4F00] hover:bg-[#FF8A41] text-white py-1.5 px-3 w-fit transition-all duration-200 rounded-xl"
        >
            {{ $t('login') }}
        </button>
    </form>
</template>

<script setup>

import { ref } from 'vue'
import InputComponent from './UI/InputComponent.vue'
import PasswordInput from './UI/PasswordInput.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const store = useStore();
const route = useRoute();
const router = useRouter()
const form = ref({
    userName: '',
    password: ''
})

const toast = useToast()
const { t } = useI18n()

const auth = () => {
    store.dispatch('fetchToken', form.value)
        .then(() => {
            store.dispatch('fetchAboutMe')
            toast.success(t('registered'))

            if (route.query.previousRoute !== undefined) {
                router.push(route.query.previousRoute)
            } else {
                router.push('/')
                document.body.style.overflow = 'auto'
            }
        })
        .catch(() => {
            toast.error(t('incorrect'))
        })
}
</script>

<style scoped>

.slide-fade-ttb-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-ttb-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-ttb-enter-from,
.slide-fade-ttb-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>

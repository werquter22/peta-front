<template>
    <form class="bg-[#ebf2ff] p-4 lg:p-[50px] my-auto mt-10 gap-5 flex flex-col rounded-xl" @submit.prevent="check">
        <InputComponent
            v-model="userName"
            :placeholder="$t('userName')"
            valid
            is-email
            :error-message="errors.userName"
        />
        <PhoneInput
            class="w-full mt-4"
            :valid="true"
            placeholder="+998 (__) ___-__-__"
            v-model="phone"
            :error-message="errors.phone"
            @completed="complete"
        />
        <PasswordInput
            v-model="password"
            :placeholder="$t('password')"
            class="w-full mt-4"
            variant="password"
            :error-message="errors.password"
        />
        <button
            class="bg-[#CD4F00] hover:bg-[#FF8A41] text-white py-1.5 px-3 w-fit transition-all duration-200 rounded-xl"
        >
            {{ $t('signUp') }}
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
import PhoneInput from './UI/PhoneInput.vue'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'

const store = useStore();
const route = useRoute();
const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const isComplete = ref(false)

const validationSchema = object({
    userName: string().min(6, t('validations.min6')).required(t('empty')),
    password: string().min(6, t('validations.min6')).required(t('empty')),
    phone: string().required(t('empty'))
        .test('is-complete', t('empty'), function (value) {
            if (!value) {
                return t('empty')
            }

            return isComplete.value
        })
})

const {handleSubmit, errors} = useForm({
    validationSchema,
    initialValues: {
        userName: '',
        phone: '',
        password: ''
    }
})

const check = handleSubmit(user => {
    store.dispatch('fetchIsUniqueUsername', {userName: user.userName})
        .then(() => {
            if (store.getters.getIsUniqueUsername) {
                signUp(user)
            } else {
                toast.error(t('userNameExists'))
            }
        })
})

const signUp = (user) => {
    store.dispatch('pushUser', user)
        .then(() => {
            store.dispatch('fetchToken', {userName: user.userName, password: user.password })
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
        })
}

const complete = (value) => {
    isComplete.value = value
}

const { value: userName } = useField('userName')
const { value: phone } = useField('phone')
const { value: password } = useField('password')
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

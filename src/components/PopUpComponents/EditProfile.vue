<template>
    <div class="container mx-5 px-5 lg:px-12 bg-[#ebf2ff] pt-10 rounded-xl">
        <h2 class="mb-10 text-center text-4xl font-semibold text-gold">
            {{ $t('edit') }}
        </h2>

        <form class="p-4 lg:p-[50px] my-auto mt-10 gap-5 flex flex-col" @submit.prevent="check">
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
            <input
                class="w-full py-1.5 px-3 h-14"
                type="file"
                accept="image/*"
                @change="setImage"
            />
            <button
                class="bg-[#CD4F00] hover:bg-[#FF8A41] text-white py-1.5 px-3 w-fit transition-all duration-200 rounded-xl"
            >
                {{ $t('edit') }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import InputComponent from '../UI/InputComponent.vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import PhoneInput from '../UI/PhoneInput.vue'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import PasswordInput from '../UI/PasswordInput.vue'

const store = useStore();
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

const setImage = (e) => {
    image.value = new FormData()
    image.value.append('file', e.target.files[0])
    store.dispatch('pushPicture', image.value)
        .then(() => image.value = store.getters.getPicture['@id'])
}

const check = handleSubmit(user => {
    if (user.userName === store.getters.getUser.userName) {
        change(user)
    } else {
        store.dispatch('fetchIsUniqueUsername', {userName: user.userName})
            .then(() => {
                if (store.getters.getIsUniqueUsername) {
                    change(user)
                } else {
                    toast.error(t('userNameExists'))
                }
            })
    }
})

const change = async (user) => {
    const userData = {
        id: store.getters.getUser.id
    };

    if (user.userName !== store.getters.getUser.userName) {
        userData.userName = user.userName
    }

    if (user.phone !== store.getters.getUser.phone) {
        userData.phone = user.phone
    }

    if (user.image) {
        userData.image = user.image
    }

    if (user.password) {
        userData.password = user.password
    }

    store.commit('close')
    toast.success(t('successfullySaved'))
    await store.dispatch('changeUser', userData)
    await store.dispatch('fetchToken', {userName: user.userName, password: user.password})
    await store.dispatch('fetchAboutMe')
}

const complete = (value) => {
    isComplete.value = value
}

const { value: userName } = useField('userName')
const { value: phone } = useField('phone')
const { value: image } = useField('image')
const { value: password } = useField('password')

onMounted(() => {
    userName.value = store.getters.getUser.userName
    phone.value = store.getters.getUser.phone
})
</script>

<style scoped>

</style>
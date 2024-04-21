<template>
    <div v-if="isLoaded" class="w-[90%] rounded-lg overflow-y-auto px-12 pb-12 bg-white h-[90vh] md:h-fit">
        <h2 class="pb-10 text-center sticky top-0 bg-white text-4xl pt-12 font-semibold text-gold">
            {{ $t('addDoctor') }}
        </h2>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto" @submit.prevent="check">
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('userName') }}</span>
                    <input
                        v-model="userName"
                        class="w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                        :placeholder="$t('userName')"
                        type="text"
                    />
                    <span v-if="errors.userName" class="text-red-700">{{ errors.userName }}</span>
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('password') }}</span>
                    <input
                        v-model="password"
                        class="w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                        :placeholder="$t('password')"
                        type="password"
                        autocomplete
                    />
                    <span v-if="errors.password" class="text-red-700">{{ errors.password }}</span>
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('phone') }}</span>
                    <PhoneInput
                        v-model="phone"
                        :error-message="errors.phone"
                        :valid="true"
                        class="w-full"
                        placeholder="+998 (__) ___-__-__"
                        @completed="complete"
                    />
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('image') }}</span>
                    <input
                        class="bg-white w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                        type="file"
                        accept="image/*"
                        @change="setImage"
                    />
                    <span v-if="errors.image" class="text-red-700"> {{ errors.image }}</span>
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('service') }}</span>
                    <select
                        v-model="service"
                        class="bg-white w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                    >
                        <option v-for="service of services" :key="service.id" :value="service['@id']">
                            {{ service.name }}
                        </option>
                    </select>
                    <span v-if="errors.service" class="text-red-700"> {{ errors.service }}</span>
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('price') }}</span>
                    <input
                        v-model="price"
                        class="w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                        :placeholder="$t('price')"
                        @input="inputMinSalary"
                        type="text"
                    />
                    <span v-if="errors.price" class="text-red-700"> {{ errors.price }}</span>
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('clinic') }}</span>
                    <select
                        v-model="clinic"
                        class="bg-white w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                    >
                        <option v-for="clinic of clinics.models" :key="clinic.id" :value="clinic['@id']">
                            {{ clinic.name }}
                        </option>
                    </select>
                    <span v-if="errors.clinic" class="text-red-700"> {{ errors.clinic }}</span>
                </label>
            </div>
            <div class="h-2 col-span-1">
            </div>
            <div class="col-span-1 flex justify-end">
                <button
                    class="bg-white text-gold border-gold w-fit px-4 py-2 md:mt-10 h-fit ml-auto col-span-2 border hover:border-gold hover:bg-gold hover:text-white"
                    type="submit"
                >
                    {{ $t('save') }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import PhoneInput from '../UI/PhoneInput.vue'
import { computed, onMounted, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { mixed, object, string } from 'yup'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const toast = useToast()
const { t } = useI18n()
const store = useStore()
const isLoaded = ref(false)

const setImage = (e) => {
    image.value = new FormData()
    image.value.append('file', e.target.files[0])
    store.dispatch('pushPicture', image.value)
        .then(() => image.value = store.getters.getPicture['@id'])
}

const isComplete = ref(false)

const validationSchema = object({
    userName: string().min(6, t('validations.min6')).required(t('empty')),
    password: string().min(6, t('validations.min6')).required(t('empty')),
    phone: string()
        .required(t('empty'))
        .test('is-complete', t('validations.isComplete'), function (value) {
            if (!value) {
                return t('empty')
            }

            return isComplete.value
        }),
    image: mixed().required(t('empty')),
    service: string().required(t('empty')),
    price: string().required(t('empty')),
    clinic: string().required(t('empty'))
})

const { handleSubmit, errors } = useForm({
    validationSchema
})

const check = handleSubmit((user) => {
    store.dispatch('fetchIsUniqueUsername', { userName: user.userName }).then(() => {
        if (store.getters.getIsUniqueUsername) {
            store.dispatch('pushEmployee', user)
                .then(() => {
                    store.commit('close')
                    store.dispatch('fetchEmployees', {page: 1})
                    toast.success(t('successfullySaved'))
                })
        } else {
            toast.error(t('userNameExists'))
        }
    })
})

const complete = (value) => {
    isComplete.value = value
}

const { value: userName } = useField('userName')
const { value: phone } = useField('phone')
const { value: password } = useField('password')
const { value: image } = useField('image')
const { value: service } = useField('service')
const { value: price } = useField('price')
const { value: clinic } = useField('clinic')

const clinics = computed(() => store.getters.getClinics)
const services = computed(() => store.getters.getServices)

const inputMinSalary = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
    price.value = Number(e.target.value.replace(/[^0-9]/g, ''));
}

onMounted(() => {
    store.dispatch('fetchClinics')
    store.dispatch('fetchServices')
    isLoaded.value = true
})
</script>

<style scoped></style>

<template>
    <div v-if="isLoaded" class="w-[90%] rounded-lg overflow-y-auto px-12 pb-12 bg-white h-[90vh] md:h-fit">
        <h2 class="pb-10 text-center sticky top-0 bg-white text-4xl pt-12 font-semibold text-gold">
            {{ $t('edit') }}
        </h2>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto" @submit.prevent="check">
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('userName') }}</span>
                    <input
                        v-model="doctor.userName"
                        class="w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                        :placeholder="$t('userName')"
                        type="text"
                    />
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('password') }}</span>
                    <input
                        v-model="doctor.password"
                        class="w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                        :placeholder="$t('password')"
                        type="password"
                        autocomplete
                    />
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('phone') }}</span>
                    <PhoneInput
                        v-model="doctor.phone"
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
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('service') }}</span>
                    <select
                        @change="changeService"
                        class="bg-white w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                    >
                        <option v-for="service of services" :key="service.id" :value="service['@id']">
                            {{ service.name }}
                        </option>
                    </select>
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('price') }}</span>
                    <input
                        v-model="doctor.price"
                        class="w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                        :placeholder="$t('price')"
                        @input="inputMinSalary"
                        type="text"
                    />
                </label>
            </div>
            <div class="h-20 col-span-1">
                <label>
                    <span class="text-gold font-semibold">{{ $t('clinic') }}</span>
                    <select
                        @change="changeClinic"
                        class="bg-white w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                    >
                        <option v-for="clinic of clinics.models" :key="clinic.id" :value="clinic['@id']">
                            {{ clinic.name }}
                        </option>
                    </select>
                </label>
            </div>
            <div class="h-2 col-span-1"></div>
            <div class="col-span-1 flex justify-end">
                <button
                    class="bg-white text-gold border-gold w-fit px-4 py-2 md:mt-10 h-fit ml-auto col-span-2 border hover:border-gold hover:bg-gold hover:text-white"
                    type="submit"
                >
                    {{ $t('edit') }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import PhoneInput from '../UI/PhoneInput.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useField } from 'vee-validate'
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
        .then(() => doctor.image = store.getters.getPicture['@id'])
}

const doctor = reactive({
    userName: null,
    password: null,
    phone: null,
    image: null,
    service: null,
    price: 0,
    clinic: null
})

const isComplete = ref(false)

const check = () => {
    const employeeData = {
        id: employee.id
    };

    if (doctor.userName) {
        employeeData.userName = doctor.userName
    }

    if (doctor.password) {
        employeeData.password = doctor.password
    }

    if (doctor.phone) {
        employeeData.phone = doctor.phone
    }

    if (doctor.image) {
        employeeData.image = doctor.image
    }

    if (doctor.service) {
        employeeData.service = doctor.service
    }

    if (doctor.price) {
        employeeData.price = doctor.price
    }

    if (doctor.clinic) {
        employeeData.clinic = doctor.clinic
    }

    store.dispatch('putEmployee', employeeData)
        .then(() => {
            store.commit('close')
            store.dispatch('fetchEmployees', {page: 1})
            toast.success(t('successfullySaved'))
        })
}

const complete = (value) => {
    isComplete.value = value
}

const { value: image } = useField('image')
const employee = store.getters.getEmployee
const clinics = computed(() => store.getters.getClinics)
const services = computed(() => store.getters.getServices)

const inputMinSalary = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
    doctor.price = Number(e.target.value.replace(/[^0-9]/g, ''));
}

const changeService = (e) => {
    doctor.service = e.target.value
}

const changeClinic = (e) => {
    doctor.clinic = e.target.value
}

onMounted(() => {
    doctor.userName = employee.user.userName
    doctor.phone = employee.user.phone
    doctor.service = employee.service
    doctor.price = employee.price
    doctor.clinic = employee.clinic
    store.dispatch('fetchClinics')
    store.dispatch('fetchServices')
    isLoaded.value = true
})
</script>

<style scoped></style>

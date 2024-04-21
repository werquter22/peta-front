<template>
    <transition name="fade">
        <div v-if="isPopUpOpen" class="absolute inset-0 z-50 bg-[#00000099] px-5 flex justify-center items-center">
            <div v-on-click-outside="closePopUp" class="flex flex-col border items-center p-8 bg-white rounded-[8px] w-full md:max-w-[25rem]">
                <div class="w-[100%]">
                    <label>
                        <span class="text-gold font-semibold">{{ $t('reserve') }}</span>
                        <input
                            v-model="selectedDate"
                            class="w-full py-2 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] text-2xl mb-5"
                            type="date"
                        />
                    </label>

                    <label>
                        <span class="text-gold font-semibold">{{ $t('time') }}</span>
                        <select
                            v-model="selectedHour"
                            class="bg-white w-full py-2 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] text-2xl mb-5"
                        >
                            <option v-for="hour of hours.hour" :key="hour" :value="hour">
                                {{ hour }}
                            </option>
                        </select>
                    </label>

                    <BaseButton @click="check" :disabled="isLoading" :class="{'cursor-not-allowed': isLoading}" class="bg-gold mt-4 font-semibold text-white hover:opacity-80 transition-all duration-200 active:opacity-50">
                        <SpinnerLoader class="border-white" v-if="isLoading"/>
                        <div v-else>{{ $t('save') }}</div>
                    </BaseButton>
                    <BaseButton @click="closePopUp" class="border font-semibold text-black mt-4 hover:opacity-80 transition-all duration-200 active:opacity-50">
                        {{ $t('popup.cancel') }}
                    </BaseButton>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>

import BaseButton from '../UI/BaseButton.vue'
import {vOnClickOutside} from '@vueuse/components'
import { computed, reactive, ref, watch } from 'vue'
import SpinnerLoader from '../UI/SpinnerLoader.vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { object, string } from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute();
const toast = useToast()
const isPopUpOpen = ref(false)
const {t} = useI18n()
const isLoading = ref(false)
const order = ref(null)
const date = ref('')
const orders = computed(() => store.getters.getTodayOrders)

const hours = reactive({
    hour: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00'
    ]
})

const validationSchema = object({
    selectedDate: string().required(t('empty')),
    selectedHour: string().required(t('empty'))
})

const { handleSubmit } = useForm({
    validationSchema
})

const updateDateTime = () => {
    if (selectedDate.value && selectedHour.value) {
        date.value = selectedDate.value + ' ' + selectedHour.value
    }
}

const check = handleSubmit(() => {
    for (const order of orders.value.models) {
        if (new Date(order.createdAt).getTime() === new Date(date.value).getTime()) {
            toast.error(t('booked'))
            return
        }
    }

    if (new Date().getTime() > new Date(date.value).getTime()) {
        toast.error(t('expired'))
        return
    }

    isLoading.value = true
    order.value.createdAt = date.value
    store.dispatch('pushOrder', order.value)
        .then(() => {
            isPopUpOpen.value = false
            store.dispatch('fetchTodayOrders', {employee: route.params.id})
            toast.success(t('successfullySaved'))
            isLoading.value = false
            order.value = null
        })
})

const closePopUp = () => {
    isPopUpOpen.value = false
}

const openPopUp = (orderData) => {
    isPopUpOpen.value = true
    order.value = orderData
}
defineExpose({openPopUp})

const { value: selectedDate } = useField('selectedDate')
const { value: selectedHour } = useField('selectedHour')

watch(() => selectedDate.value, () => {
    updateDateTime()
})

watch(() => selectedHour.value, () => {
    updateDateTime()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
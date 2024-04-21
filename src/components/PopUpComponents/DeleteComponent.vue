<template>
    <transition name="fade">
        <div v-if="isPopUpOpen" class="absolute inset-0 z-50 bg-[#00000099] px-5 flex justify-center items-center">
            <div v-on-click-outside="closePopUp" class="flex flex-col border items-center p-8 bg-white rounded-[8px] w-full md:max-w-[25rem]">
                <div class="p-1.5 bg-[#FFE4EC] rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.47012 21.0001H19.5301C21.0701 21.0001 22.0301 19.3301 21.2601 18.0001L13.7301 4.99005C12.9601 3.66005 11.0401 3.66005 10.2701 4.99005L2.74012 18.0001C1.97012 19.3301 2.93012 21.0001 4.47012 21.0001ZM12.0001 14.0001C11.4501 14.0001 11.0001 13.5501 11.0001 13.0001V11.0001C11.0001 10.4501 11.4501 10.0001 12.0001 10.0001C12.5501 10.0001 13.0001 10.4501 13.0001 11.0001V13.0001C13.0001 13.5501 12.5501 14.0001 12.0001 14.0001ZM13.0001 18.0001H11.0001V16.0001H13.0001V18.0001Z" fill="#F9690E"/>
                    </svg>
                </div>

                <div class="text-2xl font-bold text-black mt-4">{{ $t('popup.title') }}</div>

                <div class="text-center mt-4 text-[#9A9A9A]">{{ $t('popup.subTitle') }}</div>

                <BaseButton @click="deleteUser" :disabled="isLoading" :class="{'cursor-not-allowed': isLoading}" class="bg-gold mt-4 font-semibold text-white hover:opacity-80 transition-all duration-200 active:opacity-50">
                    <SpinnerLoader class="border-white" v-if="isLoading"/>
                    <div v-else>{{ $t('popup.delete') }}</div>
                </BaseButton>
                <BaseButton @click="closePopUp" class="border font-semibold text-black mt-4 hover:opacity-80 transition-all duration-200 active:opacity-50">{{ $t('popup.cancel') }}</BaseButton>
            </div>
        </div>
    </transition>
</template>

<script setup>

import BaseButton from '../UI/BaseButton.vue'
import {vOnClickOutside} from '@vueuse/components'
import { ref } from 'vue'
import SpinnerLoader from '../UI/SpinnerLoader.vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

const store = useStore()
const toast = useToast()
const isPopUpOpen = ref(false)
const {t} = useI18n()
const isLoading = ref(false)
const userId = ref(null)

const closePopUp = () => {
    isPopUpOpen.value = false
}

const openPopUp = (id) => {
    isPopUpOpen.value = true
    userId.value = id
}
defineExpose({openPopUp})

const deleteUser = () => {
    isLoading.value = true
    store.dispatch('deleteEmployee', userId.value)
        .then(() => {
            toast.success(`${t('popup.successToast')}`)
        })
        .catch(() => {
            toast.error(`${t('popup.errorToast')}`)
        })
        .finally(() => {
            isPopUpOpen.value = false
            isLoading.value = false
            store.dispatch('fetchEmployees', {page: 1})
    })
    userId.value = null
}
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
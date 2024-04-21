<template>
    <div class="bg-white w-full h-full flex flex-col">
        <div class="px-4 h-16 flex-none flex items-center bg-[#F5F5F5] border-b z-[1000] shadow border-[#CCCCCC]">
            <div class="flex gap-3 items-center">
                <button @click="$emit('update:modelValue', false)" class="md:hidden cursor-pointer text-2xl text-black hover:text-blue transition-all duration-200">
                    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1"
                              fill="currentColor"/>
                    </svg>
                </button>
                <div class="size-12 rounded-full overflow-hidden">
                    <img :src="url + chat.user.image.contentUrl" alt="avatar" class="size-full" v-if="chat.user.image">
                    <img src="/vite.svg" alt="avatar" class="size-full" v-else>
                </div>
                <div class="flex flex-col gap-0.5">
                    <p class="text-black font-semibold">{{ chat.user.userName }}</p>
                </div>
            </div>
        </div>
        <div class="h-full flex flex-col">
            <div ref="scroll" class="p-4 h-full overflow-y-scroll styled-scroll gap-8 mb-16 flex flex-col">
                <div
                    v-for="(message, index) of messages"
                    :key="message.id"
                    class="flex flex-col"
                >
                    <p
                        v-if="index === 0 || isNewDay(message, messages[index - 1])"
                        class="text-center mt-5 mb-3 text-sm"
                    >
                        {{ formatChatDate(message.message.createdAt) }}
                    </p>
                    <div
                        class="flex gap-3 flex-col max-w-[80%] min-w-[60%] w-fit p-3 rounded-tl-lg rounded-tb-lg rounded-tr-lg"
                        :class="{'self-end items-end bg-[#F5F5F5] rounded-bl-lg': message.user.id === user.id, 'self-start items-start bg-[#008BD026] rounded-br-lg': message.user.id !== user.id}"
                    >
                        <p v-if="message.message.orderStatus === 0">{{ message.message.text }}</p>
                        <p v-if="message.message.orderStatus === 1">{{ message.message.text }} - {{ $t('orderNumber') }} {{ $t('accepted') }}</p>
                        <p v-if="message.message.orderStatus === 2">{{ message.message.text }} - {{ $t('orderNumber') }} {{ $t('rejected') }}</p>
                        <div class="-mt-2 flex gap-3">
                            <p class="text-[#9A9A9A] text-sm">{{ useFormattedTime(message.message.createdAt) }}</p>
                            <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="message.user.id === user.id && message.message.hasSeen">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M355.759 520.144L401.753 473.441L418.408 490.329L687.518 217L733.544 263.669L418.408 583.667L355.759 520.144ZM218.408 490.329L487.518 217L533.544 263.669L218.408 583.667L66 428.667L112.026 381.999L218.408 490.329Z" fill="black"/>
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="message.user.id === user.id && !message.message.hasSeen">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M318.408 490.329L587.518 217L633.544 263.669L318.408 583.667L166 428.667L212.026 381.999L318.408 490.329Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <form
                class="bg-[#F5F5F5] flex-none sticky bottom-0 h-16 w-full flex items-center px-3 gap-3 border-t z-50 border-[#CCCCCC] mt-16"
                @submit.prevent="sendMessage"
            >
                <input class="w-full bg-transparent outline-0" :placeholder="$t('message')" type="text" v-model="text">
                <button class="group" type="submit">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_557_2189)">
                            <path class="group-hover:fill-blue transition-all duration-200"
                                  d="M23.625 0.147321C23.9197 0.361607 24.0402 0.647321 23.9866 1.00446L20.5581 21.5759C20.5134 21.8348 20.3706 22.0357 20.1295 22.1786C20.0045 22.25 19.8661 22.2857 19.7143 22.2857C19.6161 22.2857 19.509 22.2634 19.3929 22.2188L13.3259 19.7411L10.0848 23.692C9.92413 23.8973 9.70538 24 9.42859 24C9.31252 24 9.21431 23.9821 9.13395 23.9464C8.96431 23.8839 8.82815 23.779 8.72547 23.6317C8.62279 23.4844 8.57145 23.3214 8.57145 23.1429V18.4688L20.1429 4.28571L5.82592 16.6741L0.535738 14.5045C0.20538 14.3795 0.026809 14.1339 2.32515e-05 13.7679C-0.0178339 13.4107 0.125023 13.1473 0.428595 12.9777L22.7143 0.120536C22.8482 0.0401786 22.9911 0 23.1429 0C23.3215 0 23.4822 0.0491071 23.625 0.147321Z"
                                  fill="#535461" />
                        </g>
                        <defs>
                            <clipPath id="clip0_557_2189">
                                <rect fill="white" height="24" width="24" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>

import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import useFormattedTime from '../../plugins/helpers/useFormattedTime.js'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['update:modelValue'])
const scroll = ref()
const url = ref(import.meta.env.VITE_APP_API_URL)
const text = ref(null)
const store = useStore()
const user = computed(() => store.getters.getUser)
const chat = computed(() => store.getters.getChat)
const messages = computed(() => store.getters.getChatMessages)
const { t } = useI18n()
const chatMonths = reactive({
    months: [
        {name: t('months.January'), dayCount: 31},
        {name: t('months.February'), dayCount: 28},
        {name: t('months.March'), dayCount: 31},
        {name: t('months.April'), dayCount: 30},
        {name: t('months.May'), dayCount: 31},
        {name: t('months.June'), dayCount: 30},
        {name: t('months.July'), dayCount: 31},
        {name: t('months.August'), dayCount: 31},
        {name: t('months.September'), dayCount: 30},
        {name: t('months.October'), dayCount: 31},
        {name: t('months.November'), dayCount: 30},
        {name: t('months.December'), dayCount: 31},
    ],
})

const isNewDay = (currentMessage, previousMessage) => {
    const currentMessageDate = new Date(currentMessage.message.createdAt)
    const previousMessageDate = new Date(previousMessage.message.createdAt)
    return (
        currentMessageDate.getDate() !== previousMessageDate.getDate() ||
        currentMessageDate.getMonth() !== previousMessageDate.getMonth() ||
        currentMessageDate.getFullYear() !== previousMessageDate.getFullYear()
    )
}

const formatChatDate = (date) => {
    if (new Date(date).getFullYear() !== new Date().getFullYear()) {
        return `${new Date(date).getDate()} ${chatMonths.months[new Date(date).getMonth()].name.toLowerCase()}, ${new Date(date).getFullYear()}`
    } else {
        return `${new Date(date).getDate()} ${chatMonths.months[new Date(date).getMonth()].name.toLowerCase()}`
    }
}

const sendMessage = () => {
    if (text.value) {
        store.dispatch('pushMessage', {chat: '/api/chats/' + chat.value.id, text: text.value})
        text.value = null
    }
}

onMounted(() => {
    scroll.value.scrollTo(0, scroll.value.scrollHeight)
})

watch(() => messages.value, () => {
    setTimeout(() => {
        scroll.value?.scrollTo(0, scroll.value.scrollHeight)
    }, 0)
})

watch(() => chat.value.id, () => {
    emit('update:modelValue', false)
})
</script>

<style scoped>

.styled-scroll::-webkit-scrollbar-track {
    transition: all 0.3s ease;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50px;
    background: #F5F5F5;
}

.styled-scroll::-webkit-scrollbar {
    width: 0.4rem;
    background: transparent !important;
}

.styled-scroll::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 50px;
    cursor: pointer;
}

.styled-scroll:hover::-webkit-scrollbar-thumb {
    background-color: var(--var1);
    border-radius: 50px;
    cursor: pointer;
}

.styled-scroll::-webkit-scrollbar-thumb:hover {
    background-color: #a3b2bddd;
}

.styled-scroll::-webkit-scrollbar {
    width: 0.4rem;
}

@property --var1 {
    syntax: '<color>';
    inherits: true;
    initial-value: white;
}

.styled-scroll {
    transition: all 0.3s ease;
}

.styled-scroll:hover {
    --var1: #a3b2bd99;
}

</style>
<template>
    <div class="h-full flex-none flex-col overflow-hidden bg-[#F5F5F5] border-r border-[#CCCCCC]">
        <div class="bg-[#F5F5F5] h-16 flex items-center mx-4">
            <div class="w-full lg:w-fit flex bg-white px-2.5 items-center gap-3 py-1.5 rounded-lg">
                <label class="cursor-pointer" for="search">
                    <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="#535461"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        />
                    </svg>
                </label>
                <input
                    id="search"
                    v-model="username"
                    @input="searchChats"
                    :placeholder="$t('search')"
                    class="w-full text-sm md:text-base outline-none bg-white"
                    type="text"
                />
            </div>
        </div>
        <div class="flex-col flex gap-2 styled-scroll h-[calc(100%_-_64px)] pb-4 w-full overflow-y-auto ">
            <div
                class="w-full flex-none pl-4 pr-2 hover:bg-[#CCCCCC] select-none py-2 cursor-pointer transition-all duration-200"
                :class="{'bg-[#008BD026]': chatId === chat.id}"
                v-for="chat of chats.models"
                :key="chat.id"
            >
                <div class="flex gap-3 items-center" @click="openChat(chat.id)">
                    <div class="size-12 rounded-full overflow-hidden">
                        <img :src="url + chat.user.image.contentUrl" alt="avatar" class="size-full" v-if="chat.user.image">
                        <img src="/vite.svg" alt="avatar" class="size-full" v-else>
                    </div>
                    <div class="flex flex-col gap-0.5 overflow-hidden">
                        <p class="text-black font-semibold truncate">{{ chat.user.userName }}</p>
                        <p class="text-xs text-[#9A9A9A]" v-if="chat.message.orderStatus === 0">{{ chat.message?.text }}</p>
                        <p class="text-xs text-[#9A9A9A]" v-if="chat.message.orderStatus === 1">{{ chat.message?.text }} - {{ $t('orderNumber') }} {{ $t('accepted') }}</p>
                        <p class="text-xs text-[#9A9A9A]" v-if="chat.message.orderStatus === 2">{{ chat.message?.text }} - {{ $t('orderNumber') }} {{ $t('rejected') }}</p>
                    </div>
                    <div
                        v-if="chat.unSeenNumber"
                        class="bg-gold flex justify-center items-center p-1 min-w-6 min-h-6 max-w-12 truncate overflow-hidden text-white rounded-full text-xs font-bold ml-auto"
                    >
                        {{ chat.unSeenNumber }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

const mercure = ref(import.meta.env.VITE_APP_MERCURE_URL)
const url = ref(import.meta.env.VITE_APP_API_URL)
const chatId = ref(null)
const store = useStore()
const chats = computed(() => store.getters.getChats)
const emit = defineEmits(['update:modelValue'])
const username = ref(null)

const searchChats = () => {
    store.dispatch('fetchChats', username.value)
}

let eventSource = null;

const connectMercure = () => {
    if(eventSource) {
        eventSource.close();
    }

    eventSource = new EventSource(mercure.value + '?topic=chat/' + chatId.value);
    eventSource.addEventListener('message', async (event) => {
        await addNewMessageToArray(event);
    });
};

const addNewMessageToArray = (event) => {
    if (JSON.parse(event.data).status) {
        store.dispatch('fetchChat', chatId.value)
    }
};

const openChat = (id) => {
    chatId.value = id
    emit('update:modelValue', id)
    connectMercure()
}

onMounted(() => {
    store.dispatch('fetchChats')
    connectMercure()
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
    background: transparent!important;
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
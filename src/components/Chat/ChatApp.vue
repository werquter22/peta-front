<template>
    <transition>
        <div v-if="isOpenChat" @mousedown="isOpenChat = false" class="bg-[#00000099] fixed inset-0 overflow-hidden"></div>
    </transition>

    <div
        v-if="store.getters.isAuthorized"
        class="right-0 box-border fixed rounded-tl-lg flex rounded-bl-lg p-5 h-full w-5/6 lg:w-2/3 -translate-y-1/2 top-1/2 transition-all duration-200 ease-in-out"
        :class="{'translate-x-full': !isOpenChat}"
    >
        <ChatButtonToggler v-model="isOpenChat"/>

        <div class="absolute shadow-xl box-border top-1/2 rounded-tl-lg rounded-bl-lg bg-white -translate-y-1/2 w-full left-0 max-h-[90%] h-full overflow-hidden">
            <ChatHeader/>

            <div class="w-full h-[calc(100%_-_48px)] flex">
                <ChatSidebar class="transition-all duration-75" :class="{'w-0 md:w-64': isOpenMessage, 'w-full md:w-64': !isOpenMessage}" @update:modelValue="openChat"/>
                <ChatContent v-model="isOpenMessage" v-if="isOpenMessage"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ChatSidebar from './ChatSidebar.vue'
import ChatContent from './ChatContent.vue'
import ChatHeader from './ChatHeader.vue'
import ChatButtonToggler from './ChatButtonToggler.vue'
import { useStore } from 'vuex'

const isOpenChat = ref(false)
const isOpenMessage = ref(false)
const store = useStore()

const openChat = async (id) => {
    await store.dispatch('fetchChat', id)
    isOpenMessage.value = true
}

watch(isOpenChat, () => {
    isOpenMessage.value = false
    document.body.style.overflowX = 'hidden'
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>
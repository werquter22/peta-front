<template>
    <router-view/>
    <PopupComponent v-if="status"/>
    <PopUp v-if="popUpStatus"/>
    <ChatApp/>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import PopupComponent from './components/UI/PopupComponent.vue'
import PopUp from './components/UI/PopUp.vue'
import ChatApp from './components/Chat/ChatApp.vue'

const store = useStore();
const mercure = ref(import.meta.env.VITE_APP_MERCURE_URL)
const status = computed(() => store.getters.getIsOpenPopup)
const popUpStatus = computed(() => store.getters.getIsOpen)

watchEffect(() => {
    document.body.style.overflow = status.value ? 'hidden' : 'auto'
    document.body.style.paddingRight = status.value ? '10px' : '0px'
})

const connectMercure = () => {
    const eventSource = new EventSource(mercure.value + '?topic=chats/');
    eventSource.addEventListener('message', async (event) => {
        await addNewMessageToArray(event);
    });
};

const addNewMessageToArray = (event) => {
    if (store.getters.isAuthorized) {
        if (JSON.parse(event.data).status) {
            store.dispatch('fetchChats')
        }
    }
};

onMounted(() => {
    connectMercure();

    if (store.getters.isAuthorized) {
        store.dispatch('fetchAboutMe')
            .catch(() => {
                store.dispatch('refreshToken', store.getters.getRefreshToken)
                    .then(() => {
                        store.dispatch('fetchAboutMe')
                    })
                    .catch(() => {
                        store.commit('clearTokens')
                    })
            })
    }
})
</script>

<style >
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.card-animation {
    transform: translateY(20px) translateX(-10px);
    opacity: 0;
}
.animate-text {
    transform: translateY(-50px);
    opacity: 0;
}
</style>

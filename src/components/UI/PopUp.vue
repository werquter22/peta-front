<template>
    <div @mousedown.self="close" class="absolute w-full h-full bg-[#00000099] z-50 flex justify-center items-center">
        <AddDoctor v-if="activePopup === 'addDoctor'"/>
        <EditDoctor v-if="activePopup === 'editDoctor'"/>
        <EditProfile v-if="activePopup === 'editProfile'"/>
    </div>
</template>

<script setup>
import AddDoctor from "../PopUpComponents/AddDoctor.vue"
import {useStore} from "vuex"
import {computed} from "vue"
import EditDoctor from '../PopUpComponents/EditDoctor.vue'
import EditProfile from '../PopUpComponents/EditProfile.vue'

const store = useStore()

const activePopup = computed(() => store.getters.getActivePopup)

const close = () => store.commit('close')
</script>

<style scoped></style>

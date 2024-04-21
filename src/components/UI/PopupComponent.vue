<template>
    <div @click="close" class="fixed w-screen h-screen bg-[#000000ee] z-[1000] flex flex-col p-5">
        <button
            class="text-white self-end group hover:bg-gold rounded-full transition-all duration-200"
            @click="store.commit('closePopup')"
        >
            <svg
                class="size-[1em] text-5xl"
                fill="none"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="fill-gold group-hover:fill-[#000000ee] transition-all duration-200"
                    d="M23 10.41L21.59 9L16 14.59L10.41 9L9 10.41L14.59 16L9 21.59L10.41 23L16 17.41L21.59 23L23 21.59L17.41 16L23 10.41Z"
                    fill="#2979FF"
                />
            </svg>
        </button>
        <div class=" flex w-full h-full justify-center items-center px-20 rounded-lg">
            <div
                id="img"
                class="object-cover h-fit flex justify-center items-center select-none shadow-[0_0_10px_1px_#F9690E] m-auto rounded-lg overflow-hidden"
                v-html="store.getters.getPopupContent"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const close = e => e.target.tagName !== 'IMG' && store.commit('closePopup')


</script>

<style scoped></style>

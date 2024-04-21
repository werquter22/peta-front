<template>
    <label class="flex flex-col w-full">
        <transition-group name="list">
            <span key="1" class="relative w-full">
                <input
                    :type="isHidden ? 'password' : 'text'"
                    :placeholder="props.placeholder"
                    :value="props.modelValue"
                    @input="updateInput"
                    class=" w-full border outline-none transition-all duration-100 text-sm placeholder:text-sm rounded-xl px-4 py-2.5 mb-1 bg-white placeholder:text-gray30"
                    :class="props.errorMessage ? 'focus:border-[#ED2709] border-[#ED2709]' : 'focus:border-gray_hover border-gray30'"
                >
                <button @click="toggleHider" class="absolute right-5 bottom-1/3 cursor-pointer z-50">
                    <svg v-if="isHidden" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37156 10.452C3.24073 10.2095 3.24073 9.91533 3.37156 9.67283C4.94823 6.75699 7.86073 4.22949 10.7732 4.22949C13.6857 4.22949 16.5982 6.75699 18.1749 9.67366C18.3057 9.91616 18.3057 10.2103 18.1749 10.4528C16.5982 13.3687 13.6857 15.8962 10.7732 15.8962C7.86073 15.8962 4.94823 13.3687 3.37156 10.452Z" stroke="#5B5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5412 8.29474C13.5175 9.27104 13.5175 10.854 12.5412 11.8303C11.5649 12.8066 9.98196 12.8066 9.00565 11.8303C8.02935 10.854 8.02935 9.27104 9.00565 8.29474C9.98196 7.31843 11.5649 7.31843 12.5412 8.29474" stroke="#5B5C6B" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37156 10.452C3.24073 10.2095 3.24073 9.91533 3.37156 9.67283C4.94823 6.75699 7.86073 4.22949 10.7732 4.22949C13.6857 4.22949 16.5982 6.75699 18.1749 9.67366C18.3057 9.91616 18.3057 10.2103 18.1749 10.4528C16.5982 13.3687 13.6857 15.8962 10.7732 15.8962C7.86073 15.8962 4.94823 13.3687 3.37156 10.452Z" stroke="#5B5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5412 8.29473C13.5175 9.27104 13.5175 10.854 12.5412 11.8303C11.5649 12.8066 9.98196 12.8066 9.00565 11.8303C8.02935 10.854 8.02935 9.27104 9.00565 8.29473C9.98196 7.31842 11.5649 7.31842 12.5412 8.29473" stroke="#5B5C6B" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.9375 15.8962L16.6042 4.22949" stroke="#5B5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </span>

            <span key="2" v-if="props.errorMessage" class="text-sm leading-normal text-[#ED2709]">{{ props.errorMessage }}</span>
        </transition-group>
    </label>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    errorMessage: {
        type: String
    },
})

const emit = defineEmits(['update:modelValue'])

const updateInput = (e) => {
    emit('update:modelValue', e.target.value)
}
const isHidden = ref(true)

const toggleHider = (e) => {
    e.preventDefault()
    isHidden.value = !isHidden.value
}
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.1s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

</style>
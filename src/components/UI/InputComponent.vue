<template>
    <label class="flex flex-col w-full relative">
        <transition-group name="list">
            <input
                key="1"
                type="text"
                :placeholder="props.placeholder"
                :value="props.modelValue"
                @input="updateInput"
                class="border outline-none transition-all duration-100 text-sm placeholder:text-sm rounded-[10px] px-4 py-2.5 mb-1 placeholder:text-gray30"
                :class="props.errorMessage ? 'focus:border-[#ED2709] border-[#ED2709]' : 'focus:border-gray_hover border-gray30'"
            >
            <span key="2" v-if="props.errorMessage" class="text-sm leading-normal text-[#ED2709]">{{ props.errorMessage }}</span>
        </transition-group>
    </label>
</template>

<script setup>

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
    }
})

const emit = defineEmits(['update:modelValue'])

const updateInput = (e) => {
    emit('update:modelValue', e.target.value)
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
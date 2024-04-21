<template>
    <label class="flex flex-col w-full">
        <transition-group name="list">
            <input
                key="1"
                ref="input"
                type="text"
                :placeholder="props.placeholder"
                :value="props.modelValue"
                @input="updateInput"
                class="bg-white w-full py-1.5 px-3 border-gold border outline-0 rounded-lg focus:border-[#66afe9] h-14"
                :class="props.errorMessage ? 'focus:border-[#ED2709] border-[#ED2709]' : 'focus:border-gray_hover border-gray30'"
            >
            <span key="2" v-if="props.errorMessage" class="text-sm leading-normal text-[#ED2709]">{{ props.errorMessage }}</span>
        </transition-group>
    </label>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import IMask from "imask";

const isComplete = ref(false)
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
    },
    errorMessage: {
        type: String
    }
})

const input = ref(null)
const emit = defineEmits(['update:modelValue', 'completed'])

const updateInput = (e) => {
    emit('update:modelValue', e.target.value)
}

onMounted(() => {
    const iMask = IMask(input.value, {
        mask: [
            {
                mask: '+000 {(}00){ 000}-00-00',
                startsWith: '998',
                country: 'Uzbekistan'
            },
            {
                mask: '+0 {(}000{)} 000-00-00',
                startsWith: '7',
                country: 'Russia'
            },
            {
                mask: '+0 {(}000{)} 000-00-00',
                startsWith: '1',
                country: 'USA'
            },
            {
                mask: '0000000000000',
                startsWith: '',
                country: 'unknown'
            } // shu yerini to'g'irlash kerak
        ],
        dispatch: (appended, dynamicMasked) => {
            const number = (dynamicMasked.value + appended).replace(/\D/g,'');

            emit('update:modelValue', dynamicMasked.compiledMasks.find(m => number.indexOf(m.startsWith) === 0).value)
            return dynamicMasked.compiledMasks.find(m => number.indexOf(m.startsWith) === 0);
        }
    })
    iMask.on('complete', () => isComplete.value = !!iMask.value.length)
    iMask.on('accept', () => isComplete.value = false)
})
watch(() => isComplete.value, (value) => {
    emit('completed', value)
})
</script>

<style scoped>
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

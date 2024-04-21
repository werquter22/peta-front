<template>
    <div
        ref="selectRef"
        class="transition-all duration-200 cursor-pointer relative flex flex-col rounded-lg gap-2 w-fit select-none"
        @click="toggleSelect"
    >
        <div
            class="h-fit min-w-28 flex gap-2 justify-end group py-1.5 bg-white px-4 border border-active-bg hover:bg-hover-bg transition-all duration-200 rounded-md"
        >
            <div
                class="font-medium text-[#38385e] w-fit gap-3 flex justify-evenly items-center"
            >
                <div>{{ activeSelectItem?.name }}</div>
                <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.29736 6L8.24331 10L12.1893 6"
                        stroke="#535461"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>

        <div
            v-show="isOpenSelect"
            class="shadow-[0_2px_10px_0_#78789D] transition-all duration-200 absolute bg-white z-30 flex flex-col left-0 top-full w-full"
        >
            <div
                v-for="select of selects"
                :key="select.id"
                @click="changeSelectItem(select.id)"
            >
                <div
                    :class="{ 'bg-active-bg': select.id === activeSelectItemId }"
                    class="group transition-all duration-200 flex justify-around w-full gap-2 cursor-pointer hover:bg-hover-bg p-2"
                >
                    <div
                        :class="{ 'text-blue': select.id === activeSelectItemId }"
                        class="font-medium text-[#38385e]"
                    >
                        {{ select.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { selectItems } = defineProps({
    selectItems: {
        type: Array,
        required: true
    },
})

const { t } = useI18n()

const emit = defineEmits(['update:modelValue'])

const all = reactive({ id: 0, name: t('all') })
const selects = computed(() => [all, ...selectItems])

const activeSelectItemId = ref(0)
const isOpenSelect = ref(false)

const activeSelectItem = computed(() =>
    selects.value.find((item) => item.id === activeSelectItemId.value)
)
const toggleSelect = () => {
    isOpenSelect.value = !isOpenSelect.value
}

const changeSelectItem = (id) => {
    activeSelectItemId.value = id
    emit('update:modelValue', activeSelectItemId.value)
}

const selectRef = ref(null)

onClickOutside(selectRef, () => {
    isOpenSelect.value = false
})

</script>

<style scoped></style>

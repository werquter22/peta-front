<template>
    <div v-if="paginationNumbers.length" class="container">
        <div class="flex gap-[5px] sm:gap-[1.375rem] justify-start sm:justify-end">
            <button
                @click="previousPage"
                :disabled="currentPage <= paginationNumbers[0]"
                class="text-[5px] sm:text-[8px]"
                :class="{'hover:opacity-80': !(currentPage <= paginationNumbers[0])}"
            >
                <svg
                    style="width: 3em; height: 3em"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.5605 23.5605C23.2792 23.8417 22.8977 23.9997 22.5 23.9997C22.1022 23.9997 21.7208 23.8417 21.4395 23.5605L13.9395 16.0605C13.6583 15.7792 13.5003 15.3977 13.5003 15C13.5003 14.6023 13.6583 14.2208 13.9395 13.9395L21.4395 6.4395C21.5779 6.29623 21.7434 6.18196 21.9264 6.10335C22.1094 6.02473 22.3062 5.98335 22.5054 5.98162C22.7046 5.97989 22.9021 6.01785 23.0864 6.09327C23.2708 6.16869 23.4382 6.28007 23.5791 6.42091C23.7199 6.56175 23.8313 6.72922 23.9067 6.91357C23.9821 7.09791 24.0201 7.29543 24.0184 7.4946C24.0166 7.69377 23.9753 7.8906 23.8966 8.07361C23.818 8.25661 23.7038 8.42213 23.5605 8.5605L17.121 15L23.5605 21.4395C23.8417 21.7208 23.9997 22.1023 23.9997 22.5C23.9997 22.8977 23.8417 23.2792 23.5605 23.5605ZM14.5605 23.5605C14.2792 23.8417 13.8977 23.9997 13.5 23.9997C13.1022 23.9997 12.7208 23.8417 12.4395 23.5605L4.93948 16.0605C4.65828 15.7792 4.50031 15.3977 4.50031 15C4.50031 14.6023 4.65828 14.2208 4.93948 13.9395L12.4395 6.4395C12.7224 6.16626 13.1013 6.01507 13.4946 6.01849C13.8879 6.02191 14.2641 6.17966 14.5422 6.45777C14.8203 6.73588 14.9781 7.1121 14.9815 7.5054C14.9849 7.89869 14.8337 8.2776 14.5605 8.5605L8.12099 15L14.5605 21.4395C14.8417 21.7208 14.9997 22.1023 14.9997 22.5C14.9997 22.8977 14.8417 23.2792 14.5605 23.5605Z"
                        :fill="currentPage <= paginationNumbers[0] ? '#A3B2BD' : '#F9690E'"
                    />
                </svg>
            </button>
            <div
                class="flex text-sm sm:text-xl leading-[1rem] sm:leading-[1.758125rem] font-roboto font-medium text-[#757575] gap-[8px] sm:gap-[1.375rem] select-none items-center"
                id="numbers"
            >
                <div v-if="currentPage > 3" class="flex items-center gap-[8px] sm:gap-[1.375rem]">
                    <div
                        class="border-gold rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center cursor-pointer hover:opacity-80"
                        :class="{
                            'border-2 text-gold': currentPage === paginationNumbers[0],
                            'border-none ': currentPage !== paginationNumbers[0]
                        }"
                        @click="updateCurrentPage(paginationNumbers[0])"
                    >
                        {{ paginationNumbers[0] }}
                    </div>
                    <div @click="updateCurrentPage(currentPage - 1)" class="cursor-pointer">
                        ...
                    </div>
                </div>
                <div
                    v-for="paginationNumber of firstThreePage"
                    :key="paginationNumber"
                    class="border-gold rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center cursor-pointer hover:opacity-80"
                    :class="{
                        'border-2 text-gold': currentPage === paginationNumber,
                        'border-none ': currentPage !== paginationNumber
                    }"
                    @click="updateCurrentPage(paginationNumber)"
                >
                    {{ paginationNumber }}
                </div>
                <div
                    v-if="currentPage < paginationNumbers.at(-3)"
                    class="flex items-center gap-[8px] sm:gap-[1.375rem]"
                >
                    <div @click="updateCurrentPage(currentPage + 1)" class="cursor-pointer">
                        ...
                    </div>
                    <div
                        class="border-gold rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-80"
                        :class="{
                            'border-2 text-gold': currentPage === paginationNumbers.at(-1),
                            'border-none ': currentPage !== paginationNumbers.at(-1)
                        }"
                        @click="updateCurrentPage(paginationNumbers.at(-1))"
                    >
                        {{ paginationNumbers.at(-1) }}
                    </div>
                </div>
            </div>
            <button
                @click="nextPage" :disabled="currentPage >= paginationNumbers.at(-1)"
                class=" text-[5px] sm:text-[8px]"
                :class="{'hover:opacity-80': !(currentPage >= paginationNumbers.at(-1))}"
            >

                <svg
                    style="width: 3em; height: 3em"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.4395 23.5605C15.1583 23.2792 15.0003 22.8977 15.0003 22.5C15.0003 22.1023 15.1583 21.7208 15.4395 21.4395L21.879 15L15.4395 8.5605C15.2962 8.42213 15.182 8.25661 15.1033 8.07361C15.0247 7.8906 14.9834 7.69377 14.9816 7.4946C14.9799 7.29543 15.0178 7.09791 15.0933 6.91357C15.1687 6.72922 15.2801 6.56175 15.4209 6.42091C15.5617 6.28007 15.7292 6.16869 15.9136 6.09327C16.0979 6.01785 16.2954 5.97989 16.4946 5.98162C16.6938 5.98335 16.8906 6.02473 17.0736 6.10335C17.2566 6.18196 17.4221 6.29623 17.5605 6.4395L25.0605 13.9395C25.3417 14.2208 25.4997 14.6023 25.4997 15C25.4997 15.3977 25.3417 15.7792 25.0605 16.0605L17.5605 23.5605C17.2792 23.8417 16.8977 23.9997 16.5 23.9997C16.1023 23.9997 15.7208 23.8417 15.4395 23.5605Z"
                        :fill="currentPage >= paginationNumbers.at(-1) ? '#A3B2BD' : '#F9690E'"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.4395 23.5605C6.15829 23.2792 6.00032 22.8977 6.00032 22.5C6.00032 22.1023 6.15829 21.7208 6.4395 21.4395L12.879 15L6.4395 8.5605C6.16626 8.2776 6.01507 7.89869 6.01849 7.5054C6.02191 7.1121 6.17966 6.73589 6.45777 6.45777C6.73588 6.17966 7.1121 6.02191 7.5054 6.01849C7.89869 6.01507 8.2776 6.16626 8.5605 6.4395L16.0605 13.9395C16.3417 14.2208 16.4997 14.6023 16.4997 15C16.4997 15.3977 16.3417 15.7792 16.0605 16.0605L8.5605 23.5605C8.27921 23.8417 7.89775 23.9997 7.5 23.9997C7.10225 23.9997 6.72079 23.8417 6.4395 23.5605Z"
                        :fill="currentPage >= paginationNumbers.at(-1) ? '#A3B2BD' : '#F9690E'"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import router from '../../plugins/router.js'

const route = useRoute();
const props = defineProps({
    totalItems: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    },
    initialCurrentPage: {
        type: Number,
        required: true
    },
    baseUrl: {
        type: String,
        required: true
    },
})
const emit = defineEmits(['updatePage'])

const paginationNumbers = computed(() => {
    const pageCount = Math.ceil(props.totalItems / props.itemsPerPage);

    return Array.from({ length: pageCount }, (_, index) => index + 1);
})

const currentPage = ref(1)

const firstThreePage = computed(() => {
    if (currentPage.value < paginationNumbers.value.at(-3)) {
        return currentPage.value < paginationNumbers.value[3]
            ? paginationNumbers.value.slice(0, 3)
            : paginationNumbers.value.slice(currentPage.value - 2, currentPage.value + 1)
    } else {
        return paginationNumbers.value.slice(-3)
    }
})

const updateCurrentPage = (pageNumber) => {
    router.push(props.baseUrl + pageNumber)
    currentPage.value = pageNumber
}

const previousPage = () => {
    currentPage.value > 1 && currentPage.value--
    router.push(props.baseUrl + currentPage.value)
}

const nextPage = () => {
    currentPage.value < paginationNumbers.value.at(-1) && currentPage.value++
    router.push(props.baseUrl + currentPage.value)
}

watch(() => route.params.id, (newVal) => {
    currentPage.value = +route.params.id
    emit('updatePage', newVal)
})
onMounted(() => {
    currentPage.value = props.initialCurrentPage
})
</script>

<style scoped></style>

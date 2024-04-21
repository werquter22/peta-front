<template>
    <div class="w-full">
        <DeleteComponent ref="deleteRef" />
        <table class="hidden md:table table-auto overflow-x-scroll w-full">
            <thead>
                <tr class="text-left text-black">
                    <th class="w-fit text-nowrap px-2 h-14">#</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('doctor') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('service') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14"> {{ $t('price') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('phone') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('clinic') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14"></th>
                </tr>
            </thead>
            <tbody class="text-[#3F3D56]">
                <tr
                    v-for="(employee, index) of employees"
                    :key="employee.id"
                    class="text-left border-t border-b border-[#E6E6E6] active:bg-[#B8B8D21f]"
                >
                    <td class="w-fit text-nowrap px-2 h-14">{{ index + 1 }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ employee.user.userName }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ employee.service.name }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ useFormattedSum(employee.price) }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ employee.user.phone }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ employee.clinic.name }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">
                        <div class="flex gap-2">
                            <button
                                @click="editDoctor(employee.id)"
                                class="group focus:outline-[#a683fa] active:bg-[#a683fa] hover:bg-[#9061F9] p-2 group transition-bg duration-200 rounded-lg active:scale-90"
                            >
                                <svg
                                    class=":"
                                    fill="none"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        class="group-hover:stroke-white group-active:stroke-white"
                                        d="M11 4.00001H6.8C5.11984 4.00001 4.27976 4.00001 3.63803 4.32699C3.07354 4.61461 2.6146 5.07356 2.32698 5.63804C2 6.27978 2 7.11986 2 8.80001V17.2C2 18.8802 2 19.7203 2.32698 20.362C2.6146 20.9265 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7203 20 18.8802 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9448C10.8425 15.8958 11.0376 15.815 11.2166 15.7053C11.4184 15.5816 11.5914 15.4087 11.9373 15.0628L21.5 5.50001C22.3284 4.67159 22.3284 3.32844 21.5 2.50001C20.6716 1.67159 19.3284 1.67159 18.5 2.50001L8.93723 12.0628C8.59133 12.4087 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1575 8.05523 13.3616C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                                        stroke="#9061F9"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    />
                                </svg>
                            </button>

                            <button
                                @click="openPopUp(employee.id)"
                                class="group focus:outline-[#ec7d74] active:bg-[#ec7d74] outline-8 hover:bg-[#F87052] p-2 group transition-bg duration-200 rounded-lg active:scale-90"
                            >
                                <svg
                                    fill="none"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        class="group-hover:stroke-white group-active:stroke-white"
                                        d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                        stroke="#F87052"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="block md:hidden">
            <div
                v-for="(employee, index) of employees"
                :key="employee.id"
                class="p-4 pt-0 border border-[#CCCCCC80] mx-2 my-4 rounded-lg"
            >
                <div class="flex justify-between items-center h-12 py-1">
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="text-black">{{ index + 1 }}</p>
                    </div>

                    <div class="flex gap-2">
                        <button
                            @click="editDoctor(employee.id)"
                            class="group focus:outline-[#a683fa] active:bg-[#a683fa] hover:bg-[#9061F9] p-2 group transition-bg duration-200 rounded-lg active:scale-90"
                        >
                            <svg
                                class=":"
                                fill="none"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    class="group-hover:stroke-white group-active:stroke-white"
                                    d="M11 4.00001H6.8C5.11984 4.00001 4.27976 4.00001 3.63803 4.32699C3.07354 4.61461 2.6146 5.07356 2.32698 5.63804C2 6.27978 2 7.11986 2 8.80001V17.2C2 18.8802 2 19.7203 2.32698 20.362C2.6146 20.9265 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7203 20 18.8802 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9448C10.8425 15.8958 11.0376 15.815 11.2166 15.7053C11.4184 15.5816 11.5914 15.4087 11.9373 15.0628L21.5 5.50001C22.3284 4.67159 22.3284 3.32844 21.5 2.50001C20.6716 1.67159 19.3284 1.67159 18.5 2.50001L8.93723 12.0628C8.59133 12.4087 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1575 8.05523 13.3616C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                                    stroke="#9061F9"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                />
                            </svg>
                        </button>

                        <button
                            @click="openPopUp(employee.id)"
                            class="group focus:outline-[#ec7d74] active:bg-[#ec7d74] outline-8 hover:bg-[#F87052] p-2 group transition-bg duration-200 rounded-lg active:scale-90"
                        >
                            <svg
                                fill="none"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    class="group-hover:stroke-white group-active:stroke-white"
                                    d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                    stroke="#F87052"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex justify-between items-center h-12 py-1">
                    <p class="font-semibold text-black">{{ $t('doctor') }}</p>
                    <p class="text-black">{{ employee.user.userName }}</p>
                </div>
                <div class="flex justify-between items-center h-12 py-1">
                    <p class="font-semibold text-black"> {{ $t('service') }}</p>
                    <p class="text-black">{{ employee.service.name }}</p>
                </div>
                <div class="flex justify-between items-center h-12 py-1">
                    <p class="font-semibold text-black">{{ $t('price') }}</p>
                    <p class="text-black">{{ useFormattedSum(employee.price) }}</p>
                </div>
                <div class="flex justify-between items-center h-12 py-1">
                    <p class="font-semibold text-black">{{ $t('phone') }}</p>
                    <p class="text-black">{{ employee.user.phone }}</p>
                </div>
                <div class="flex justify-between items-center h-12 py-1">
                    <p class="font-semibold text-black">{{ $t('clinic') }}</p>
                    <p class="text-black">{{ employee.clinic.name }}</p>
                </div>
            </div>
        </div>
        <DeleteComponent ref="deleteRef" />
    </div>
</template>

<script setup>
import useFormattedSum from '../plugins/helpers/useFormattedSum.js'
import { useStore } from 'vuex'
import DeleteComponent from './PopUpComponents/DeleteComponent.vue'
import { ref } from 'vue'

const store = useStore();
const deleteRef = ref(null)

defineProps({
    employees: {
        type: Array,
        required: true
    }
})

const editDoctor = async (id) => {
    await store.dispatch('fetchEmployee', id)
    store.commit('open', 'editDoctor')
}

const openPopUp = (id) => {
    deleteRef.value?.openPopUp(id)
}
</script>

<style scoped></style>

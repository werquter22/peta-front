<template>
    <div class="w-full">
        <table class="hidden md:table table-auto overflow-x-scroll w-full">
            <thead>
                <tr class="text-left text-black">
                    <th class="w-fit text-nowrap px-2 h-14">#</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('customer') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('doctor') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('service') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('clinic') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('phone') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('doctorAnswer') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('status') }}</th>
                    <th class="w-fit text-nowrap px-2 h-14">{{ $t('time') }}</th>
                </tr>
            </thead>
            <tbody class="text-[#3F3D56]">
            <transition-group name="fruit-list">
                <tr
                    v-for="(order, index) of orders"
                    :key="order.id"
                    class="text-left border-t border-b border-[#E6E6E6] active:bg-[#B8B8D21f]"
                    :class="{'bg-[#F5F5F5]': order.status === 1, 'bg-red-100': order.status === 2}"
                >
                    <td class="w-fit text-nowrap px-2 h-14">{{ index + 1 }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ order.createdBy.userName }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ order.employee.user.userName }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ order.employee.service.name }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ order.employee.clinic.name }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ order.createdBy.phone }}</td>
                    <td class="w-fit text-nowrap px-2 h-14" v-if="isDoctor && order.status === 0">
                        <button class="mt-2" @click="accepted(order.id)">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#00D0B7" fill-opacity="0.15"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 26C17.3132 26 18.6136 25.7413 19.8268 25.2388C21.0401 24.7362 22.1425 23.9997 23.0711 23.0711C23.9997 22.1425 24.7362 21.0401 25.2388 19.8268C25.7413 18.6136 26 17.3132 26 16C26 14.6868 25.7413 13.3864 25.2388 12.1732C24.7362 10.9599 23.9997 9.85752 23.0711 8.92893C22.1425 8.00035 21.0401 7.26375 19.8268 6.7612C18.6136 6.25866 17.3132 6 16 6C13.3478 6 10.8043 7.05357 8.92893 8.92893C7.05357 10.8043 6 13.3478 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C10.8043 24.9464 13.3478 26 16 26ZM15.7422 20.0444L20.9777 13.7619C21.1545 13.5497 21.1258 13.2345 20.9137 13.0577L19.9752 12.2756C19.7631 12.0988 19.4478 12.1275 19.271 12.3396L14.8133 17.6878L12.6947 15.5682C12.4994 15.3728 12.1828 15.3728 11.9875 15.5681L11.1236 16.432C10.9283 16.6273 10.9283 16.9438 11.1236 17.1391L14.1033 20.1189L14.5762 20.5918C14.7841 20.7997 15.1256 20.7842 15.3139 20.5584L15.7422 20.0444Z" fill="#00AA96"/>
                            </svg>
                        </button>
                        <button class="ms-4" @click="rejected(order.id)">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#FFE4EC"/>
                                <path d="M16 26C13.3478 26 10.8043 24.9464 8.92893 23.0711C7.05357 21.1957 6 18.6522 6 16C6 13.3478 7.05357 10.8043 8.92893 8.92893C10.8043 7.05357 13.3478 6 16 6C18.6522 6 21.1957 7.05357 23.0711 8.92893C24.9464 10.8043 26 13.3478 26 16C26 18.6522 24.9464 21.1957 23.0711 23.0711C21.1957 24.9464 18.6522 26 16 26ZM21 15.5C21 15.2239 20.7761 15 20.5 15H11.5C11.2239 15 11 15.2239 11 15.5V16.5C11 16.7761 11.2239 17 11.5 17H20.5C20.7761 17 21 16.7761 21 16.5V15.5Z" fill="#FF477E"/>
                            </svg>
                        </button>
                    </td>
                    <td class="w-fit text-nowrap px-2 h-14" v-if="!isDoctor && order.status === 0">{{ $t('sent') }}</td>
                    <td class="w-fit text-nowrap px-2 h-14" v-if="order.status === 1">{{ $t('accepted') }}</td>
                    <td class="w-fit text-nowrap px-2 h-14" v-if="order.status === 2">{{ $t('rejected') }}</td>
                    <td class="w-fit text-nowrap px-2 h-14" v-if="order.isHome">{{ $t('house') }}</td>
                    <td class="w-fit text-nowrap px-2 h-14" v-else>{{ $t('toClinic') }}</td>
                    <td class="w-fit text-nowrap px-2 h-14">{{ useFormattedDate(order.createdAt) }}. {{ useFormattedTime(order.createdAt) }}</td>
                </tr>
            </transition-group>
            </tbody>
        </table>

        <div class="block md:hidden">
            <transition-group name="fruit-list">
                <div
                    v-for="(order, index) of orders"
                    :key="order.id"
                    class="p-4 pt-0 border border-[#CCCCCC80] mx-2 my-4 rounded-lg"
                    :class="{'bg-[#F5F5F5]': order.status === 1}"
                >
                    <div class="flex justify-between items-center h-12 py-1">
                        <div class="flex justify-between items-center h-12 py-1">
                            <p class="text-black">{{ index + 1 }}</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('customer') }}</p>
                        <p class="text-black">{{ order.createdBy.userName }}</p>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('doctor') }}</p>
                        <p class="text-black">{{ order.employee.user.userName }}</p>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('service') }}</p>
                        <p class="text-black">{{ order.employee.service.name }}</p>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('clinic') }}</p>
                        <p class="text-black">{{ order.employee.clinic.name }}</p>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('phone') }}</p>
                        <p class="text-black">{{ order.createdBy.phone }}</p>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('doctorAnswer') }}</p>
                        <div v-if="isDoctor && order.status === 0">
                            <button class="mt-2" @click="accepted(order.id)">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="32" height="32" rx="16" fill="#00D0B7" fill-opacity="0.15"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 26C17.3132 26 18.6136 25.7413 19.8268 25.2388C21.0401 24.7362 22.1425 23.9997 23.0711 23.0711C23.9997 22.1425 24.7362 21.0401 25.2388 19.8268C25.7413 18.6136 26 17.3132 26 16C26 14.6868 25.7413 13.3864 25.2388 12.1732C24.7362 10.9599 23.9997 9.85752 23.0711 8.92893C22.1425 8.00035 21.0401 7.26375 19.8268 6.7612C18.6136 6.25866 17.3132 6 16 6C13.3478 6 10.8043 7.05357 8.92893 8.92893C7.05357 10.8043 6 13.3478 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C10.8043 24.9464 13.3478 26 16 26ZM15.7422 20.0444L20.9777 13.7619C21.1545 13.5497 21.1258 13.2345 20.9137 13.0577L19.9752 12.2756C19.7631 12.0988 19.4478 12.1275 19.271 12.3396L14.8133 17.6878L12.6947 15.5682C12.4994 15.3728 12.1828 15.3728 11.9875 15.5681L11.1236 16.432C10.9283 16.6273 10.9283 16.9438 11.1236 17.1391L14.1033 20.1189L14.5762 20.5918C14.7841 20.7997 15.1256 20.7842 15.3139 20.5584L15.7422 20.0444Z" fill="#00AA96"/>
                                </svg>
                            </button>
                            <button class="ms-4" @click="rejected(order.id)">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="32" height="32" rx="16" fill="#FFE4EC"/>
                                    <path d="M16 26C13.3478 26 10.8043 24.9464 8.92893 23.0711C7.05357 21.1957 6 18.6522 6 16C6 13.3478 7.05357 10.8043 8.92893 8.92893C10.8043 7.05357 13.3478 6 16 6C18.6522 6 21.1957 7.05357 23.0711 8.92893C24.9464 10.8043 26 13.3478 26 16C26 18.6522 24.9464 21.1957 23.0711 23.0711C21.1957 24.9464 18.6522 26 16 26ZM21 15.5C21 15.2239 20.7761 15 20.5 15H11.5C11.2239 15 11 15.2239 11 15.5V16.5C11 16.7761 11.2239 17 11.5 17H20.5C20.7761 17 21 16.7761 21 16.5V15.5Z" fill="#FF477E"/>
                                </svg>
                            </button>
                        </div>
                        <p class="text-black" v-if="!isDoctor && order.status === 0">{{ $t('sent') }}</p>
                        <p class="text-black" v-if="order.status === 1">{{ $t('accepted') }}</p>
                        <p class="text-black" v-if="order.status === 2">{{ $t('rejected') }}</p>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('status') }}</p>
                        <p class="text-black" v-if="order.isHome">{{ $t('house') }}</p>
                        <p class="text-black" v-else>{{ $t('toClinic') }}</p>
                    </div>
                    <div class="flex justify-between items-center h-12 py-1">
                        <p class="font-semibold text-black">{{ $t('time') }}</p>
                        <p class="text-black">{{ useFormattedDate(order.createdAt) }}. {{ useFormattedTime(order.createdAt) }}</p>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script setup>
import useFormattedDate from '../plugins/helpers/useFormattedDate.js'
import useFormattedTime from '../plugins/helpers/useFormattedTime.js'

const emit = defineEmits(['update:modelValue'])

defineProps({
    orders: {
        type: Array,
        required: true
    },
    isDoctor: {
        type: Boolean,
        required: false
    }
})

const accepted = (id) => {
    emit('update:modelValue', {id: id, status: 1})
}

const rejected = (id) => {
    emit('update:modelValue', {id: id, status: 2})
}
</script>

<style scoped>
.fruit-list-item {
    display: inline-block;
    margin-right: 10px;
}

.fruit-list-enter-active,
.fruit-list-leave-active {
    transition: all 0.4s ease;
}

.fruit-list-enter-from,
.fruit-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
</style>

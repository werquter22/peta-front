<template>
    <div class="py-2.5 shadow-sm relative bg-white px-4">
        <div class="container mx-auto lg:px-20">
            <div class="flex gap-10 items-center container mx-auto ">
                <router-link to="/" class="h-14">
                    <img alt="logo" class="h-full" src="/images/logo3.png" />
                </router-link>
                <ul class="hidden xl:flex gap-5 ml-auto items-center text-[#0E0E0E]">
                    <router-link to="/" class="hover:text-gold transition-all duration-200 font-normal cursor-pointer">{{ $t('home') }}</router-link>
                    <router-link to="/categories" class="hover:text-gold transition-all duration-200 font-normal cursor-pointer">{{ $t('categories') }}</router-link>
                    <router-link to="/doctors/1" class="hover:text-gold transition-all duration-200 font-normal cursor-pointer">{{ $t('doctors') }}</router-link>
                    <router-link to="/clinics" class="hover:text-gold transition-all duration-200 font-normal cursor-pointer">{{ $t('clinics') }}</router-link>
                    <router-link to="/contact" class="hover:text-gold transition-all duration-200 font-normal cursor-pointer">{{ $t('contact') }}</router-link>
                </ul>

                <div class="hidden xl:flex gap-4 items-center ">
                    <LanguageSwitcher/>
                    <div class="size-12 bg-white px-1 rounded-full relative" v-on-click-outside="() => isOpenProfile = false" v-if="store.getters.isAuthorized">
                        <transition name="scale-out">
                            <div v-if="!isOpenProfile" @click="toggleProfileMenu" class="size-10 absolute  group cursor-pointer top-1/2 left-1/2 z-20 overflow-hidden -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#22222255]">
                                <div class="size-8 -bottom-1/3 absolute left-1/2 -translate-x-1/2 group-hover:bg-gold bg-white transition-all duration-200 rounded-full"></div>
                                <div class="size-3.5 top-1 absolute left-1/2 -translate-x-1/2 group-hover:bg-gold bg-white transition-all duration-200 rounded-full"></div>
                            </div>
                        </transition>
                        <transition name="scale">
                            <div v-if="isOpenProfile" class=" bg-gray-100 shadow-md rounded-tr-[20px] rounded-bl-[20px] -top-1 -right-1 z-0 absolute px-4 py-2 pb-4 flex flex-col gap-8">
                                <div class="relative">
                                    <div class="text-end mr-14 text-[#222] mb-8 mt-1">
                                        <div class="text-gold font-bold text-xl">{{ store.getters.getUser.userName }}</div>
                                    </div>
                                    <div class="size-10 absolute  group cursor-pointer top-5 -right-7 z-20 overflow-hidden -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#22222255]">
                                        <div class="size-8 -bottom-1/3 absolute left-1/2 -translate-x-1/2 group-hover:bg-gold bg-white transition-all duration-200 rounded-full"></div>
                                        <div class="size-3.5 top-1 absolute left-1/2 -translate-x-1/2 group-hover:bg-gold bg-white transition-all duration-200 rounded-full"></div>
                                    </div>
                                    <div class="w-full flex flex-col gap-4 mr-14">
                                        <div class="flex gap-2 font-semibold text-[#222] items-center group cursor-pointer" v-if="isAdmin">
                                            <svg
                                                fill="none"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                width="32"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M19.7867 21.68C23.8133 22.44 26.6667 24.3867 26.6667 26.6667V29.3333H5.33334V26.6667C5.33334 24.3867 8.18667 22.44 12.2133 21.68L16 28L19.7867 21.68ZM10.6667 10.6667H21.3333V13.3333C21.3333 14.7478 20.7714 16.1044 19.7712 17.1046C18.771 18.1048 17.4145 18.6667 16 18.6667C14.5855 18.6667 13.229 18.1048 12.2288 17.1046C11.2286 16.1044 10.6667 14.7478 10.6667 13.3333V10.6667ZM10.6667 9.33334L11.2133 3.86667C11.2465 3.53664 11.4015 3.23082 11.648 3.00893C11.8946 2.78704 12.215 2.66501 12.5467 2.66667H19.4667C20.1467 2.66667 20.72 3.18667 20.7867 3.86667L21.3333 9.33334H10.6667ZM16 4.00001H14.6667V5.33334H13.3333V6.66667H14.6667V8.00001H16V6.66667H17.3333V5.33334H16V4.00001Z"
                                                    fill="#222"
                                                />
                                            </svg>
                                            <router-link to="/employees/1" class="select-none group-hover:text-gold transition-all duration-200">
                                                {{$t('employees') }}
                                            </router-link>
                                        </div>
                                        <div class="flex gap-2 font-semibold text-[#222] items-center group cursor-pointer">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path class="group-hover:fill-gold transition-all duration-200" d="M23.0333 27L27.6667 22.4L26.2667 21L23.0333 24.1667L21.7333 22.8667L20.3333 24.3L23.0333 27ZM8 12H24V9.33333H8V12ZM24 30.6667C22.1556 30.6667 20.5836 30.0164 19.284 28.716C17.9844 27.4156 17.3342 25.8436 17.3333 24C17.3324 22.1564 17.9827 20.5844 19.284 19.284C20.5853 17.9836 22.1573 17.3333 24 17.3333C25.8427 17.3333 27.4151 17.9836 28.7173 19.284C30.0196 20.5844 30.6693 22.1564 30.6667 24C30.664 25.8436 30.0138 27.416 28.716 28.7173C27.4182 30.0187 25.8462 30.6684 24 30.6667ZM4 29.3333V6.66667C4 5.93333 4.26133 5.30578 4.784 4.784C5.30667 4.26222 5.93422 4.00089 6.66667 4H25.3333C26.0667 4 26.6947 4.26133 27.2173 4.784C27.74 5.30667 28.0009 5.93422 28 6.66667V15.5667C27.3778 15.2556 26.7276 15.0276 26.0493 14.8827C25.3711 14.7378 24.688 14.6658 24 14.6667H8V17.3333H17.4667C17.0889 17.7111 16.7391 18.1222 16.4173 18.5667C16.0956 19.0111 15.812 19.4889 15.5667 20H8V22.6667H14.7667C14.7222 22.8889 14.6947 23.1058 14.684 23.3173C14.6733 23.5289 14.6676 23.7564 14.6667 24C14.6667 24.9333 14.7947 25.828 15.0507 26.684C15.3067 27.54 15.6898 28.3564 16.2 29.1333L16 29.3333L14 27.3333L12 29.3333L10 27.3333L8 29.3333L6 27.3333L4 29.3333Z" fill="#222"/>
                                            </svg>
                                            <router-link to="/orders/1" class="select-none group-hover:text-gold transition-all duration-200">
                                                {{ isAdmin ? $t('orders') : $t('myOrders') }}
                                            </router-link>
                                        </div>
                                        <div class="flex gap-2 font-semibold text-[#222] items-center group cursor-pointer" @click="openPopup('editProfile')">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path class="group-hover:fill-gold transition-all duration-200" d="M28 7.66667C28 6.69421 27.6137 5.76158 26.9261 5.07394C26.2384 4.38631 25.3058 4 24.3333 4H7.66667C6.69421 4 5.76158 4.38631 5.07394 5.07394C4.38631 5.76158 4 6.69421 4 7.66667V24.3333C4 25.3058 4.38631 26.2384 5.07394 26.9261C5.76158 27.6137 6.69421 28 7.66667 28H16.0293C15.0138 26.4157 14.5441 24.5427 14.692 22.6667H9C8.74664 22.6666 8.50275 22.5703 8.31761 22.3974C8.13248 22.2244 8.0199 21.9876 8.00263 21.7348C7.98536 21.4821 8.06469 21.2321 8.22458 21.0356C8.38447 20.8391 8.613 20.7105 8.864 20.676L9 20.6667H15.084C15.4885 19.4188 16.171 18.2791 17.08 17.3333H9C8.74664 17.3333 8.50275 17.237 8.31761 17.064C8.13248 16.8911 8.0199 16.6543 8.00263 16.4015C7.98536 16.1487 8.06469 15.8988 8.22458 15.7023C8.38447 15.5057 8.613 15.3772 8.864 15.3427L9 15.3333H19C19.216 15.3333 19.4173 15.4027 19.58 15.52C20.7513 14.9578 22.0341 14.6662 23.3333 14.6667C24.9874 14.6641 26.6072 15.1371 28 16.0293V7.66667ZM23 10C23.2534 10.0001 23.4973 10.0963 23.6824 10.2693C23.8675 10.4423 23.9801 10.6791 23.9974 10.9318C24.0146 11.1846 23.9353 11.4345 23.7754 11.6311C23.6155 11.8276 23.387 11.9561 23.136 11.9907L23 12H9C8.74664 11.9999 8.50275 11.9037 8.31761 11.7307C8.13248 11.5577 8.0199 11.3209 8.00263 11.0682C7.98536 10.8154 8.06469 10.5655 8.22458 10.3689C8.38447 10.1724 8.613 10.0439 8.864 10.0093L9 10H23ZM16.6667 20.8387L17.2627 21.412C17.5212 21.6608 17.7268 21.9592 17.8673 22.2893C18.0077 22.6195 18.0801 22.9746 18.0801 23.3333C18.0801 23.6921 18.0077 24.0472 17.8673 24.3773C17.7268 24.7075 17.5212 25.0059 17.2627 25.2547L16.6667 25.828C16.9333 26.5933 17.32 27.2987 17.804 27.9213L18.6067 27.684C18.9534 27.5818 19.3173 27.5511 19.6763 27.5939C20.0352 27.6366 20.3817 27.7519 20.6947 27.9327C21.0078 28.1136 21.2807 28.3561 21.4971 28.6457C21.7135 28.9353 21.8687 29.2659 21.9533 29.6173L22.1853 30.5707C22.9453 30.6983 23.7213 30.6983 24.4813 30.5707L24.712 29.616C24.7968 29.2645 24.9522 28.934 25.1687 28.6444C25.3852 28.3549 25.6583 28.1124 25.9715 27.9317C26.2846 27.751 26.6313 27.6358 26.9903 27.5932C27.3493 27.5507 27.7133 27.5815 28.06 27.684L28.8627 27.9213C29.3453 27.2987 29.732 26.5933 30 25.828L29.404 25.2547C29.1455 25.0059 28.9399 24.7075 28.7994 24.3773C28.6589 24.0472 28.5865 23.6921 28.5865 23.3333C28.5865 22.9746 28.6589 22.6195 28.7994 22.2893C28.9399 21.9592 29.1455 21.6608 29.404 21.412L30 20.8387C29.7375 20.0836 29.3533 19.3765 28.8627 18.7453L28.06 18.9827C27.7133 19.0849 27.3494 19.1156 26.9904 19.0728C26.6315 19.03 26.2849 18.9147 25.9719 18.7339C25.6589 18.5531 25.3859 18.3105 25.1696 18.0209C24.9532 17.7313 24.798 17.4008 24.7133 17.0493L24.4813 16.096C23.7209 15.9682 22.9445 15.9682 22.184 16.096L21.9547 17.0507C21.8699 17.4021 21.7145 17.7327 21.498 18.0222C21.2815 18.3118 21.0083 18.5543 20.6952 18.735C20.382 18.9157 20.0354 19.0309 19.6764 19.0734C19.3173 19.116 18.9534 19.0851 18.6067 18.9827L17.804 18.7453C17.3133 19.3765 16.9291 20.0836 16.6667 20.8387ZM23.3333 25.3333C22.2667 25.3333 21.4 24.4373 21.4 23.3333C21.4 22.2293 22.2667 21.3333 23.3333 21.3333C24.4 21.3333 25.2667 22.2293 25.2667 23.3333C25.2667 24.4373 24.4 25.3333 23.3333 25.3333Z" fill="#222"/>
                                            </svg>
                                            <div class="select-none group-hover:text-gold transition-all duration-200">{{ $t('mySettings') }}</div>
                                        </div>
                                        <div class="flex gap-2 font-semibold text-[#222] items-center group cursor-pointer">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path class="group-hover:fill-gold transition-all duration-200" fill-rule="evenodd" clip-rule="evenodd" d="M4.66666 12.7573V19.2427C4.66666 22.3013 4.66666 23.8293 5.62933 24.78C6.50266 25.6427 7.86133 25.7213 10.424 25.7293C10.2893 24.8293 10.2613 23.756 10.2533 22.492C10.2533 22.3634 10.2787 22.236 10.328 22.1172C10.3772 21.9983 10.4494 21.8904 10.5404 21.7995C10.6315 21.7086 10.7395 21.6365 10.8584 21.5874C10.9773 21.5383 11.1047 21.5132 11.2333 21.5133C11.362 21.5117 11.4898 21.5355 11.6093 21.5833C11.7288 21.6311 11.8377 21.702 11.9298 21.7919C12.022 21.8817 12.0955 21.9889 12.1462 22.1072C12.1969 22.2255 12.2238 22.3526 12.2253 22.4813C12.2333 23.9 12.2693 24.9053 12.412 25.668C12.5493 26.404 12.768 26.828 13.088 27.1453C13.452 27.5053 13.9627 27.7387 14.928 27.8653C15.92 27.9987 17.2347 28 19.1213 28H20.4347C22.3213 28 23.636 27.9973 24.6293 27.8667C25.5933 27.7387 26.104 27.504 26.4667 27.1453C26.8307 26.7853 27.068 26.2813 27.1973 25.3293C27.3307 24.3507 27.3333 23.0507 27.3333 21.1893V10.8107C27.3333 8.94799 27.3307 7.65066 27.1973 6.67066C27.068 5.71866 26.8307 5.21332 26.468 4.85466C26.104 4.49466 25.5933 4.26132 24.628 4.13466C23.6373 3.99999 22.3227 3.99999 20.436 3.99999H19.1227C17.236 3.99999 15.9213 4.00266 14.928 4.13332C13.964 4.26132 13.4533 4.49599 13.0893 4.85466C12.7693 5.17066 12.5507 5.59599 12.4133 6.33199C12.2707 7.09466 12.2347 8.09999 12.2267 9.51866C12.2251 9.64736 12.1982 9.77449 12.1475 9.89279C12.0968 10.0111 12.0233 10.1182 11.9312 10.2081C11.839 10.298 11.7301 10.3689 11.6106 10.4167C11.4911 10.4645 11.3634 10.4882 11.2347 10.4867C11.106 10.4868 10.9786 10.4616 10.8597 10.4125C10.7408 10.3634 10.6328 10.2914 10.5418 10.2005C10.4508 10.1096 10.3786 10.0016 10.3293 9.88282C10.28 9.764 10.2547 9.63662 10.2547 9.50799C10.2627 8.24399 10.2907 7.17066 10.4253 6.27066C7.86266 6.27866 6.50533 6.35732 5.63066 7.21999C4.668 8.17066 4.66666 9.69999 4.66666 12.7573ZM7.91333 16.688C7.8219 16.5983 7.74927 16.4912 7.69969 16.3731C7.65011 16.2549 7.62457 16.1281 7.62457 16C7.62457 15.8719 7.65011 15.7451 7.69969 15.6269C7.74927 15.5088 7.8219 15.4017 7.91333 15.312L10.54 12.7173C10.726 12.5344 10.9765 12.4319 11.2373 12.4319C11.4982 12.4319 11.7486 12.5344 11.9347 12.7173C12.0261 12.8071 12.0987 12.9141 12.1483 13.0323C12.1979 13.1504 12.2234 13.2772 12.2234 13.4053C12.2234 13.5334 12.1979 13.6603 12.1483 13.7784C12.0987 13.8965 12.0261 14.0036 11.9347 14.0933L10.988 15.0267H20.436C20.98 15.0267 21.4227 15.4627 21.4227 16C21.4227 16.5373 20.98 16.9733 20.436 16.9733H10.9867L11.9333 17.9067C12.0248 17.9964 12.0974 18.1035 12.147 18.2216C12.1966 18.3397 12.2221 18.4665 12.2221 18.5947C12.2221 18.7228 12.1966 18.8496 12.147 18.9677C12.0974 19.0859 12.0248 19.1929 11.9333 19.2827C11.7473 19.4656 11.4969 19.568 11.236 19.568C10.9751 19.568 10.7247 19.4656 10.5387 19.2827L7.91333 16.688Z" fill="#222"/>
                                            </svg>
                                            <div class="select-none group-hover:text-gold transition-all duration-200" @click="logout">{{ $t('logout') }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <router-link :to="{name: 'auth'}" v-else class="hover:text-gold transition-all duration-200 font-normal cursor-pointer">
                        {{ $t('login') }}
                    </router-link>
                </div>
                <button @click="isOpenMenu = !isOpenMenu" class="xl:hidden flex ml-auto items-center hover:bg-gray-200 px-2 py-1.5 transition-all duration-200">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.3 7.96667H26.6333M5.3 15.9667H26.6333M5.3 23.9667H26.6333" stroke="#535461" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <transition name="slide-fade-ttb">
                <div
                    @click.self="isOpenMenu = false"
                    v-show="isOpenMenu"
                    :class="
                        {
                            'w-full left-0  h-screen transition-all duration-200 transform-y-full border-t xl:border-none': isOpenMenu
                        }"
                    class="left-0 flex shadow-md items-start justify-between xl:hidden transition-all -transform-y-full duration-200 bg-[#00000099] absolute w-full h-0 overflow-hidden top-full py-0">
                    <div class="w-full bg-white py-4">
                        <ul class="cursor-pointer flex flex-col w-full">
                            <router-link @click.self="isOpenMenu = false" to="/" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5">{{ $t('home') }}</router-link>
                            <router-link @click.self="isOpenMenu = false" to="/categories" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5">{{ $t('categories') }}</router-link>
                            <router-link @click.self="isOpenMenu = false" to="/doctors/1" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5">{{ $t('doctors') }}</router-link>
                            <router-link @click.self="isOpenMenu = false" to="/clinics" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5">{{ $t('clinics') }}</router-link>
                            <router-link @click.self="isOpenMenu = false" to="/contact" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5">{{ $t('contact') }}</router-link>
                            <div v-if="store.getters.isAuthorized">
                                <hr>
                                <div class="m-4 text-gold font-bold text-xl">
                                    {{ store.getters.getUser.userName }}
                                </div>
                                <div class="my-2">
                                    <router-link to="/employees/1" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5" v-if="isAdmin">
                                        {{$t('employees') }}
                                    </router-link>
                                </div>
                                <div class="mt-3">
                                    <router-link to="/orders/1" class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5">
                                        {{ isAdmin ? $t('orders') : $t('myOrders') }}
                                    </router-link>
                                </div>
                                <div class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5" @click="openPopup('editProfile')">
                                    {{ $t('mySettings') }}
                                </div>
                                <router-link
                                    @click.self="isOpenMenu = false"
                                    :to="{name: 'auth'}"
                                    class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5"
                                    @click="logout"
                                >
                                    {{ $t('logout') }}
                                </router-link>
                            </div>
                            <router-link
                                @click.self="isOpenMenu = false"
                                :to="{name: 'auth'}"
                                class="px-4 hover:text-white hover:bg-gold transition-all duration-200 font-normal cursor-pointer py-2.5"
                                v-else
                            >
                                {{ $t('login') }}
                            </router-link>
                        </ul>
                        <LanguageSwitcher position-select-menu="top" class="mr-4 ml-auto"/>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import LanguageSwitcher from "./UI/LanguageSwitcher.vue";
import {vOnClickOutside} from "@vueuse/components";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpenMenu = ref(false)
const isOpenProfile = ref(false)
const isAdmin = ref(false)
const store = useStore();

const toggleProfileMenu = () => isOpenProfile.value = !isOpenProfile.value

const logout = () => {
    store.commit('clearTokens')
    router.push('/')
}

const openPopup = content => {
    store.commit('open', content)
}

onMounted(() => {
    if (store.getters.isAuthorized) {
        store.dispatch('fetchAboutMe')
            .then(() => {
                isAdmin.value = store.getters.getUserRoles.includes('ROLE_ADMIN')
            })
    }
})
</script>

<style scoped>
.slide-fade-ttb-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-ttb-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-ttb-enter-from,
.slide-fade-ttb-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
.scale-enter-active {
    transition: all 0.1s ease-out;
}

.scale-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.scale-enter-from,
.scale-leave-to {
    transform: translateX(10px) translateY(-10px) scale(.4);
    transform-origin: top right;
    opacity: 0;
}
.scale-out-enter-active {
    transition: all 0.1s ease-out;
}

.scale-out-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.scale-out-enter-from,
.scale-out-leave-to {
    transform: translateX(10px) translateY(-50px) scale(.2);
    transform-origin: top right;
    opacity: 0;
}
</style>

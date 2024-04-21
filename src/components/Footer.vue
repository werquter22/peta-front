<template>
    <div class="w-full bg-[#222222] py-10">
        <div class="container flex flex-wrap gap-5 justify-between mx-auto lg:px-20 px-4">
            <div class="flex gap-2 text-white items-center">
                <div>© 2024 Company name</div>
                <a href="#" class="transition-all duration-200 hover:text-gold text-white">Petaclinics.uz</a>
            </div>
            <div class="flex gap-6 text-white items-center">
                <div class="group size-6 flex items-center justify-center">
                    <FontAwesomeIcon :icon="faFacebookF" class=" group-hover:text-gold transition-all duration-200 cursor-pointer"/>
                </div>
                <div class="group size-6 flex items-center justify-center">
                    <FontAwesomeIcon :icon="faTwitter" class=" group-hover:text-gold transition-all duration-200 cursor-pointer"/>
                </div>
                <div class="group size-6 flex items-center justify-center">
                    <FontAwesomeIcon :icon="faGooglePlusG" class=" group-hover:text-gold transition-all duration-200 cursor-pointer"/>
                </div>
                <div class="group size-6 flex items-center justify-center">
                    <FontAwesomeIcon :icon="faLinkedinIn" class=" group-hover:text-gold transition-all duration-200 cursor-pointer"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {faFacebookF} from "@fortawesome/free-brands-svg-icons/faFacebookF";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faGooglePlusG} from "@fortawesome/free-brands-svg-icons/faGooglePlusG";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<style scoped>

</style>
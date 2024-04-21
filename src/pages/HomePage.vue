<template>
    <HeaderComponent class="sticky top-0 z-40" />

    <div id="home" class="h-[700px] bg-[url('/images/banner/dog_doc_2.jpg')] bg-no-repeat bg-cover">
<!--        <div class="container mx-auto lg:px-20 px-4 h-full flex items-center">-->
<!--            <div-->
<!--                class="my-auto flex flex-col items-end px-6 text-white py-8 w-fit ml-auto gap-5 relative"-->
<!--            >-->
<!--                <div class="bg-black absolute inset-0 opacity-15 rounded"></div>-->
<!--                <h2-->
<!--                    class="relative z-10 font-semibold text-3xl text-right text-[#2c8cb3] md:text-white md:text-[39px]"-->
<!--                >-->
<!--                    {{ $t('strongerThanEver') }}-->
<!--                </h2>-->
<!--                <p class="relative z-10 text-xl md:text-2xl text-end mt-8 md:mt-2 leading-8">-->
<!--                    {{ $t('awesomeDescription1') }}-->
<!--                </p>-->
<!--                <router-link-->
<!--                    to="/doctors"-->
<!--                    class="relative z-10 hover:bg-gold hover:border-gold transition-all duration-300 px-7 py-2 border-2 border-white mt-5 text-lg font-normal"-->
<!--                >-->
<!--                    {{ $t('startNow') }}-->
<!--                </router-link>-->
<!--            </div>-->
<!--        </div>-->
    </div>
    <CategoriesComponent id="categories"/>
    <DoctorsComponent id="doctors"/>
    <ClinicsComponent id="clinics"/>
    <GalleriesComponent id="gallery"/>
    <ContactPage/>
    <Footer/>
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue'
import DoctorsComponent from '../components/DoctorsComponent.vue'
import ClinicsComponent from '../components/ClinicsComponent.vue'
import GalleriesComponent from '../components/GalleriesComponent.vue'
import Footer from "../components/Footer.vue";
import CategoriesComponent from '../components/CategoriesComponent.vue'
import ContactPage from './ContactPage.vue'
</script>

<style scoped></style>

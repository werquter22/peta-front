<template>
    <button class="w-full whitespace-nowrap rounded-xl py-2.5 font-semibold hover" :class="buttonType">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps(['buttonType'])
</script>

<style scoped>
.blue {
    background-color: #2264d1;
    color: #fff;
}
.blue:active {
    background-color: #1f77fa;
    color: #fff;
}
.blue-light {
    background-color: #ebf2ff;
    color: #5a5b6a;
}
.white {
    background-color: #ffffff;
    color: #F9690E;
    box-shadow: 0 2px 4px rgba(41, 121, 255, 0.24);
}
.blue-outline {
    background-color: white;
    border: 2px #F9690E solid;
    color: #F9690E;
}
.black-outline {
    background-color: white;
    border: 2px #19191d solid;
    color: #19191d;
}

.hover:hover {
    background-color: #F9690E;
    color: #fff;
}
</style>

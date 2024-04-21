<template>
    <div :class="`border-[${color}]`" class="size-6 rounded-full animate-spin border-[5px] border-solid border-t-transparent"></div>
</template>

<script setup>
defineProps({
    color: {
        type: String,
        default: 'white'
    }
})
</script>

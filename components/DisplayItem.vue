<template>
    <NuxtLink :to='/vehicle/ + vehicle.id'>
        <div class='p-1.5 bg-red-200 rounded-lg text-black'>
            <h1>{{ vehicle.name }}</h1>
        </div>
    </NuxtLink>
</template>

<script setup lang='ts'>
const props = defineProps(['vehicle']);
</script>
<template>
    <div class='bg-[#C4C4C4] dark:bg-[#3D3D3D] text-black dark:text-white h-screen'>
        <Navigation />
        <NuxtPage />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - VehiclePlatform` : 'VehiclePlatform';
    },
})
</script>
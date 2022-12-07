<template>
    <div class='flex flex-wrap gap-4'>
        <DisplayItem v-for='vehicle in vehicles' :key='vehicle.id' :vehicle='vehicle' />
    </div>

</template>

<script setup lang='ts'>
const props = defineProps(['vehicles']);
</script>

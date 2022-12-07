<template>
<div class='m-3'>
    <h1 class='text-3xl'>Statistics</h1>
    <br />
    <div v-if='pending'><Icon class='text-2xl animate-spin' name='material-symbols:refresh' />Loading...</div>
    <div v-else class='w-1/2 mx-auto'>
        <DoughnutChart :chart-data='chartData' chartId="all-time" css-classes=""  />
    </div>

</div>
</template>

<script setup lang='ts'>
useHead({
    title: 'Statistics'
})

const { refresh, pending, data: chartData } = await useLazyFetch('/api/getChartdata');
</script>
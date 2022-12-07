<template>
<div class='bg-[#3D3D3D]'>
    <div class="m-3 mb-0">
        <h1 class='text-3xl'>Statistics</h1>
        <br />
        <div v-if='pending'><Icon class='text-2xl animate-spin' name='material-symbols:refresh' />Loading...</div>
        <div v-else class='w-[350px] sm:w-2/3 lg:w-2/5 pb-5 mx-auto flex justify-center'>
            <DoughnutChart :chart-data='chartData' chartId="all-time" css-classes=""  />
        </div>
    </div>
</div>
</template>

<script setup lang='ts'>
useHead({
    title: 'Statistics'
})

const { refresh, pending, data: chartData } = await useLazyFetch('/api/getChartdata');
</script>
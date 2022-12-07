<template>
    <Doughnut :data="chartData" :options="chartOptions" :chart-id="chartId" :style="cssClasses" />
</template>

<script setup lang='ts'>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

const props = defineProps(['chartData', 'chartId', 'cssClasses']);
const chartOptions = {
    responsive: true,
}

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
</script>
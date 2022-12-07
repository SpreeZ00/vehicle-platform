<template>
    <table class='table-fixed sm:table-auto bg-slate-600 rounded-md w-full text-center'>
        <thead>
            <tr>
                <th>Date</th>
                <th class="hidden sm:table-cell">Mileage</th>
                <th>Distance</th>
                <th>Refueled</th>
                <th>Consumption</th>
                <th class="hidden sm:table-cell">Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for='(receipt) in receipts' :key='receipt.id'>
                <td>{{ formatDate(receipt.date) }}</td>
                <td class="hidden sm:table-cell">{{ receipt.mileage }}</td>
                <td>{{ calcDistance(receipt) }}</td>
                <td>{{ receipt.amount }}</td>
                <td>{{ calcConsumption(receipt) }}</td>
                <td class="hidden sm:table-cell">{{ formatPrice(Number(receipt.price)) }}</td>
                <td class='flex gap-2 justify-center'>
                    <button class='btn btn-danger' @click="$emit('deleteReceipt', receipt.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang='ts'>
const route = useRoute();
const props = defineProps(['receipts', 'vehicle']);
const emits = defineEmits(['deleteReceipt']);

const calcDistance = (receipt: any) => {
    return props.receipts.indexOf(receipt) === 0 ? receipt.mileage - props.vehicle.mileage : receipt.mileage - props.receipts[props.receipts.indexOf(receipt) - 1].mileage;
}

const calcConsumption = (receipt: any) => {
    return (receipt.amount / (calcDistance(receipt)) * 100).toFixed(2);
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('de-DE', {year: 'numeric', day: '2-digit', month: '2-digit'});
}

const formatPrice = (price: number) => {
    return price.toFixed(2);
}
</script>
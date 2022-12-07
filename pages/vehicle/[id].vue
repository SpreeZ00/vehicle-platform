<template>
<div class='m-3'>
    <h1 class='text-3xl'>{{ vehicle.name }}</h1>
    <br />
    <div v-if='pending'><Icon class='text-2xl animate-spin' name='material-symbols:refresh' />Loading...</div>
    <div v-else>
        <div v-if='receipts.length === 0'>Currently there is no data to be displayed. Please add a receipt.</div>
        <DataTable v-else :receipts='receipts' :vehicle='vehicle' @delete-receipt='handleReceiptDelete' />
    </div>
    <br />
    <button class='btn btn-primary mr-3' @click='togglePopupModal'>Add Receipt</button>
    <button class='btn btn-danger' @click='handleDelete'>Delete Vehicle</button>
    <PopupModal class='text-white' v-if="showPopupModal" @close-modal="togglePopupModal">
        <template #title>Create a new Receipt</template>
        <template #body>
            <form class="m-3" id="createNewReceiptForm">
                <label class='font-bold' for='date'>Date</label><br />
                <input class='mb-2 p-1.5 rounded text-black' type='date' name='date' id='date' required/><br />

                <label class="font-bold" for="mileage">Mileage</label><br />
                <input v-if='receipts.length !== 0' class="mb-2 p-1.5 rounded text-black" type="number" name="mileage" id="mileage" :min='receipts[receipts.length - 1].mileage + 1' @change='calcDistance' required/>
                <input v-else class="mb-2 p-1.5 rounded text-black" type="number" name="mileage" id="mileage" :min='vehicle.vehicle.mileage + 1' @change='calcDistance' required/><br />

                <label class="font-bold" for="distance">Distance</label><br />
                <input class="mb-2 p-1.5 rounded text-black" type="number" name="distance" id="distance" readonly/><br />

                <label class="font-bold" for="amount">Amount (litres)</label><br />
                <input class="mb-2 p-1.5 rounded text-black" type="number" name="amount" id="amount" step="0.01" min="0" required/><br />

                <label class="font-bold" for="price">Price</label><br />
                <input class="mb-2 p-1.5 rounded text-black" type="number" name="price" id="price" step="0.01" min="0" required/><br />

                <button class="mt-3 mb-3 btn btn-primary" type="submit" @click.prevent="handleCreate">
                    Submit
                </button>
            </form>
        </template>
    </PopupModal>
</div>
</template>

<script setup lang='ts'>
const router = useRouter();
const route = useRoute();
const { data: vehicle } = await useFetch('/api/getVehicle?id=' + route.params.id);
const { refresh, pending, data: receipts }= await useLazyFetch('/api/getReceipts?vehicleId=' + route.params.id);
const showPopupModal = ref(false);

useHead({
    title: `${vehicle.value.name}`
})

const togglePopupModal = () => {
    showPopupModal.value = !showPopupModal.value;
}

watch(receipts, (newReceipts) => {})

const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        await useFetch('/api/deleteVehicle?id=' + route.params.id, {
            method: 'DELETE',
        });
        router.push('/');
    }
}

const handleReceiptDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this receipt?')) {
        await useFetch('/api/deleteReceipt?id=' + id, {
            method: 'DELETE',
        });
        await refresh();
    }
}

const handleCreate = async () => {
    const form = document.getElementById('createNewReceiptForm') as HTMLFormElement;
    const formData = new FormData(form);
    await useFetch('/api/createReceipt', {
        method: 'POST',
        body: {
            id: route.params.id,
            name: vehicle.value.name,
            date: formData.get('date'),
            mileage: Number(formData.get('mileage')),
            amount: Number(formData.get('amount')),
            price: Number(formData.get('price'))
        }
    });
    form.reset();
    togglePopupModal();
    await refresh();
}

const calcDistance = () => {
    const mileage = document.getElementById('mileage') as HTMLInputElement;
    const distance = document.getElementById('distance') as HTMLInputElement;
    if (receipts.value.length !== 0) {
        distance.value = (Number(mileage.value) - receipts.value[receipts.value.length - 1].mileage);
    } else {
        distance.value = (Number(mileage.value) - vehicle.value.vehicle.mileage);
    }
}
</script>
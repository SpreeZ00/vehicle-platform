<template>
<div class='m-3'>
    <h1 class='text-3xl'>{{ vehicle.name }}</h1>
    <br />
    <div v-if='pending'><Icon class='text-2xl animate-spin' name='material-symbols:refresh' />Loading...</div>
    <div v-else>
        <div v-if='receipts.length === 0'>Currently there is no data to be displayed. Please add a receipt.</div>
        <DataTable v-else :receipts='receipts' :vehicle='vehicle' @update-receipt="toggleUpdateReceiptPopupModal" @delete-receipt='handleReceiptDelete' />
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
                <input v-else class="mb-2 p-1.5 rounded text-black" type="number" name="mileage" id="mileage" :min='vehicle.mileage + 1' @change='calcDistance' required/><br />

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
  <PopupModal v-if="showUpdateReceiptPopupModal" @close-modal="toggleUpdateReceiptPopupModal">
    <template #title>Edit Receipt</template>
    <template #body>
      <form @submit.prevent='handleUpdate' id="updateReceiptForm" class="flex gap-4 justify-center">
        <div class="text-center">
          <h3 class='text-xl'>Actual values</h3>
          <span>Mileage: {{receipts[receipts.map((receipt) => receipt.id).indexOf(receiptId)].mileage}}</span><br />
          <span>Date: {{receipts[receipts.map((receipt) => receipt.id).indexOf(receiptId)].date}}</span><br />
          <span>Refueled: {{receipts[receipts.map((receipt) => receipt.id).indexOf(receiptId)].amount}}</span><br />
          <span>Price: {{receipts[receipts.map((receipt) => receipt.id).indexOf(receiptId)].price}}</span><br />
        </div>
        <div class="text-center">
          <h3 class='text-xl'>New values</h3>
          <input v-if="receipts.map((receipt) => receipt.id).indexOf(receiptId) === 0" class="text-black" type="number" name="mileage" id="mileage" :min="vehicle.mileage + 1" />
          <input v-else class="text-black" type="number" name="mileage" id="mileage" :min="receipts[receipts.map((receipt) => receipt.id).indexOf(receiptId) - 1].mileage + 1" />
          <br />
          <input class="text-black" type="date" name="date" id="date" /><br />
          <input class="text-black" type="number" name="amount" id="amount" step="0.01" min="0" /><br />
          <input class="text-black" type="number" name="price" id="price" step="0.01" min="0" /><br />
            <button class="mt-3 mb-3 btn btn-primary" type="submit">
              Submit
            </button>
        </div>

      </form>
    </template>
  </PopupModal>
</div>
</template>

<script setup lang='ts'>
import { Receipt, Vehicle } from '.prisma/client';

const router = useRouter();
const route = useRoute();
const { data: vehicle }: Vehicle = await useFetch('/api/getVehicle?id=' + route.params.id);
const { refresh, pending, data: receipts }: Receipt = await useLazyFetch('/api/getReceipts?vehicleId=' + route.params.id);
const showPopupModal = ref(false);
const showUpdateReceiptPopupModal = ref(false);
const receiptId = ref(0);

useHead({
    title: `${vehicle.value.name}`
})

const togglePopupModal = () => {
    showPopupModal.value = !showPopupModal.value;
}

watch(receipts, (newReceipts) => {})

const toggleUpdateReceiptPopupModal = (id: number) => {
  if (showUpdateReceiptPopupModal) {
    receiptId.value = id;
  }
  showUpdateReceiptPopupModal.value = !showUpdateReceiptPopupModal.value;
}

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
        distance.value = (Number(mileage.value) - vehicle.value.mileage);
    }
}

async function handleUpdate() {
    const form = document.getElementById('updateReceiptForm') as HTMLFormElement;
    const formData = new FormData(form);
    await useFetch('/api/updateReceipt', {
        method: 'PATCH',
        body: {
        id: receiptId.value,
        mileage: Number(formData.get('mileage') === '' ? receipts.value[receipts.value.map((receipt) => receipt.id).indexOf(receiptId.value)].mileage : formData.get('mileage')),
        date: formData.get('date') === '' ? receipts.value[receipts.value.map((receipt) => receipt.id).indexOf(receiptId.value)].date : formData.get('date'),
        amount: Number(formData.get('amount') === '' ? receipts.value[receipts.value.map((receipt) => receipt.id).indexOf(receiptId.value)].amount : formData.get('amount')),
        price: Number(formData.get('price') === '' ? receipts.value[receipts.value.map((receipt) => receipt.id).indexOf(receiptId.value)].price : formData.get('price'))
        }
    });
    form.reset();
    toggleUpdateReceiptPopupModal(0);
    await refresh();
}
</script>
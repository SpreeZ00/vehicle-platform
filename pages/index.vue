<template>
    <div class=''>
        <section class='m-5'>
            <div v-if='pending'><Icon class='text-2xl animate-spin' name='material-symbols:refresh' />Loading...</div>
            <div v-else>
                <div v-if='vehicles.length === 0'>Currently there is no data to be displayed. Please create a vehicle.</div>
                <div v-else>
                    <h2 class='text-2xl'>Please select a vehicle or create a new one:</h2>
                    <br />
                    <VehicleDisplay :vehicles='vehicles' />
                </div>
            </div>

            <button class='btn btn-primary flex items-center' @click='togglePopupModal'><Icon class='text-2xl ' name='material-symbols:add' /> New vehicle</button>
            <PopupModal class='text-white' v-if="showPopupModal" @close-modal="togglePopupModal">
                <template #title>Create a new vehicle</template>
                <template #body>
                    <form class="m-3" id="createNewVehicleForm">
                        <label class="font-bold" for="vehicleName">Vehicle name</label><br />
                        <input class="mb-2 p-1.5 rounded text-black" type="text" name="name" id="name" required/><br />

                        <label class="font-bold" for="mileage_start">Initial mileage</label><br />
                        <input class="mb-2 p-1.5 rounded text-black" type="number" name="mileage" id="mileage" step="1" min="0" required/><br />

                        <button class="mt-3 mb-3 btn btn-primary" type="submit" @click.prevent="handleForm">
                            Submit
                        </button>
                    </form>
                </template>
            </PopupModal>
        </section>
    </div>
</template>

<script setup lang="ts">
const { pending, refresh, data: vehicles } = await useLazyFetch('/api/getVehicles');
const showPopupModal = ref(false);

useHead({
    title: 'Home'
})

const togglePopupModal = () => {
    showPopupModal.value = !showPopupModal.value;
}

watch(vehicles, (newVehicles) => {});

const handleForm = async () => {
    const form = document.getElementById('createNewVehicleForm') as HTMLFormElement;
    const formData = new FormData(form);
    await useFetch('/api/createVehicle', {
        method: 'POST',
        body: {
            name: formData.get('name'),
            mileage: Number(formData.get('mileage'))
        }
    });
    form.reset();
    togglePopupModal();
    refresh();
}
</script>
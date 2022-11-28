<template>
    <div> Hi im the index</div>
    <form action="/api/createVehicle" method="post">
        <input type="text" name="name" id="nameInput">
        <input type="number" name="mileage" id="mileageInput">
        <button type="submit">Submit</button>
    </form>
</template>
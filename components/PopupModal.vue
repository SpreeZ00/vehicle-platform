<template>
    <div class="backdrop" @click.self="$emit('close-modal')">
        <div class="mt-6 p-3 mx-auto w-3/5 rounded-md bg-[#666666]">
            <div class="text-center">
                <h2 class='font-bold text-2xl'><slot name="title"></slot></h2>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineEmits(['close-modal']);
</script>

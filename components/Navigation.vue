<template>
<nav class='h-16'>
    <ul class="flex flex-wrap items-center ml-2 gap-4">
        <NuxtLink to="/">
            <li class="w-32 py-3.5 text-center btn btn-highlight">
                Home
            </li>
        </NuxtLink>
        <NuxtLink to="/statistics">
            <li class="w-32 py-3.5 text-center btn btn-highlight">
                Statistics
            </li>
        </NuxtLink>
    </ul>
    <button class='btn btn-primary-variant absolute top-0 right-3' @click='toggleSettings'><Icon class='text-2xl' name='material-symbols:settings' /></button>
    <PopupModal class='text-white' v-if="showSettings" @close-modal="toggleSettings">
        <template #title>Settings</template>
        <template #body>
            <ul class='flex flex-col text-xl text-center mt-3 cursor-pointer'>
                <li v-if='darkMode' @click='toggleDarkMode'>Turn off dark mode <Icon class='text-3xl text-yellow-300' name='material-symbols:clear-day-rounded' /></li>
                <li v-else @click='toggleDarkMode'>Turn on dark mode <Icon class='text-3xl text-sky-900' name='material-symbols:dark-mode' /></li>
            </ul>
        </template>
    </PopupModal>
</nav>
</template>

<script setup lang='ts'>
const showSettings = ref(false);
const { darkMode, toggleDarkMode } = useDarkMode();

const toggleSettings = () => {
    showSettings.value = !showSettings.value;
}
</script>
export const useDarkMode = () => {
    const darkMode = ref(false);
    const toggleDarkMode = () => {
        darkMode.value = !darkMode.value;
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
    };

    // Toggle dark-mode if system prefers dark-mode or if user has set theme "dark" in localStorage
    onMounted(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            darkMode.value = true;
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    return {
        darkMode,
        toggleDarkMode,
    };
};

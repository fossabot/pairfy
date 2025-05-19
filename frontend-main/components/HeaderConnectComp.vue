<template>
    <button :class="{ contrast: isContrast }">
        Connect Wallet
    </button>
</template>

<script setup>
const route = useRoute()

const isContrast = computed(() => route.name === 'p')

</script>

<style lang="css" scoped>
button {
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
    background: white;
    color: var(--text-a);
    padding: 0.75rem 1rem;
    border: 2px solid white;
    overflow-wrap: break-word;
    font-size: var(--text-size-1);
    border-radius: var(--radius-e);
    transition: var(--transition-a);
}

button:hover {
    opacity: 0.9;
}

button.contrast {
    border: 2px solid black;
    color: var(--text-w);
    background: black;
}

button:hover.contrast {
    opacity: 1;
    color: var(--text-w);
    border: 2px solid var(--primary-a);
    background: var(--primary-a);
}
</style>
<template>
    <button>
        Connect Wallet
    </button>
</template>

<script setup>

</script>

<style lang="css" scoped>
button {
    outline: none;
    cursor: pointer;
    white-space: nowrap;
    color: var(--text-w);
    padding: 0.75rem 1rem;
    background: var(--primary-a);
    overflow-wrap: break-word;
    font-size: var(--text-size-1);
    border-radius: var(--button-radius);
    border: 2px solid var(--border-a);
    transition: var(--transition-a);
}

button:hover {
    opacity: 0.9;
}
</style>
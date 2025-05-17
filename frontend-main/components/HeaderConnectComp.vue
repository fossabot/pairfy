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
    background: transparent;
    overflow-wrap: break-word;
    font-size: var(--text-size-1);
    border-radius: var(--radius-c);
    border: 2px solid rgba(255, 255, 255, 70%);
    transition: var(--transition-a);
}

button:hover{
    border: 2px solid rgba(255, 255, 255, 100%);
}
</style>
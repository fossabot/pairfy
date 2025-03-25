<template>
        <span class="loader"></span>
</template>

<script setup>

</script>

<style lang="css" scoped>
.loader {
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid var(--primary-a);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
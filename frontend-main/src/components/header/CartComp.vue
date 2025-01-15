<template>
    <div class="button">
        <span class="cart">0</span>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.button {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    margin: auto;
    justify-content: center;
    width: 42px;
    height: 42px;
}

.button span {
    line-height: initial;
}

.cart {
    background: var(--background-b);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    padding: 0 1rem;
    font-size: var(--text-size-0);
}
</style>
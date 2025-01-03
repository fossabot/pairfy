<template>
    <div class="button">
        <span class="cart">0</span>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.button {
    color: var(--text-a);
    display: flex;
    flex-direction: column;
    font-weight: 600;
    margin: auto;
    justify-content: center;
    font-size: var(--text-size-0);
}

.button span {
    line-height: initial;
}

.cart {
    background: var(--background-b);
    border-radius: 20px;
    color: var(--text-a);
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    padding: 0 1rem;
}
</style>
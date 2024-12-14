<template>
    <div class="nav">
        <span>All</span>
        <span>Categories</span>
        <span>Discounts</span>
        <span>Rewards</span>
        <span>Sell</span>
        <span>Help</span>
        <span>Support</span>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.nav {
    display: flex;
    align-items: center;
}

.nav span {
    margin-right: 1.5rem;
    font-size: var(--text-size-a);
    cursor: pointer;
    font-weight: 500;
}
</style>
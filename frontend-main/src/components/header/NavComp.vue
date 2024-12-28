<template>
    <div class="nav">
        <span>Home</span> 
        <span>Categories</span>
        <span>Discounts</span>
        <span>Rewards</span>
        <span>Sell</span>
        <span>Help</span>
        <span>Support</span>
        <span>Documentation</span>
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
    font-size: var(--text-size-1);
    cursor: pointer;
    font-weight: 400;
}
</style>
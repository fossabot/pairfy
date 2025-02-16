<template>
    <div class="nav flex">
        <span>Best Sellers</span>
        <span>Discounts</span>
        <span>Rewards</span>
        <span>Support</span>
        <span>Sell</span>
        <span>
            <a href="https://cardano-ecommerce.gitbook.io/marketplace" target="_blank"
                rel="noopener noreferrer">Docs</a>
        </span>
        <span>Electronics</span>
        <span>Garden</span>
        <span>Office</span>
    </div>
</template>

<script setup>
</script>

<style lang="css" scoped>
.nav {
    justify-content: space-between;
    font-size: var(--text-size-0);
    width: inherit;
    color: inherit;
    cursor: pointer;
    font-weight: 600;
}

.price {
    white-space: nowrap;
    font-weight: 500;
}

.arrow i {
    font-size: var(--text-size-2);
}
</style>
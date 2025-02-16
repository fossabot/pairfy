<template>
    <div class="nav flex">
        <div class="selector flex">
            <div class="selector-b flex">
                <i class="pi pi-bars" />
            </div>
            <span>All Categories</span>
            <div class="arrow flex">
                <i class="pi pi-angle-down" />
            </div>
        </div>
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
    width: inherit;
    color: inherit;
}

.nav span {
    font-size: var(--text-size-0);
    cursor: pointer;
    font-weight: 600;

}

.selector {
    background: transparent;
    white-space: nowrap;
    padding: 1rem 0;
}

.selector-b i {
    font-size: var(--text-size-3);
}

.selector span {
    margin: 0 1rem;
}

.price {
    white-space: nowrap;
    font-weight: 500;
}

.arrow i {
    font-size: var(--text-size-2);
}
</style>
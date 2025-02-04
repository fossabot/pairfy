<template>
    <div class="nav flex">
        <div class="categories flex">
            <div class="categories-button flex">
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

.categories {
    background: var(--background-b);
    white-space: nowrap;
    padding: 0.5rem 1rem;
    border-radius: 20px;
}

.categories-button i {
    font-size: var(--text-size-3);
}

.categories span {
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
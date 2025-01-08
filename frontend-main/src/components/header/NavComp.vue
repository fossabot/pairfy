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
            <span>Discounts</span>
            <span>Earn Rewards</span>
            <span>Sell Products</span>
            <span>Support</span>
            <span>
                <a href="https://cardano-ecommerce.gitbook.io/marketplace" target="_blank"
                    rel="noopener noreferrer">Documentation</a>
            </span>
            <span>Electronics</span>
            <span>Garden</span>
            <span>Best Sellers</span>
            <span class="ADA">ADAUSD {{ formatPriceToUSD(getADAprice) }} </span>
        </div>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import { inject } from 'vue';

const { getADAprice } = headerAPI();

const { formatPriceToUSD } = inject('utils');


</script>

<style lang="css" scoped>
.nav {
    justify-content: space-between;
    width: inherit;
}

.nav span {
    font-size: var(--text-size-1);
    cursor: pointer;
    font-weight: 400;
}

.categories, .ADA {
    background: var(--background-b);
    white-space: nowrap;
    padding: 0.5rem 1rem;
    border-radius: 20px;
}

.categories span{
    margin: 0 1rem;
}

.ADA {
    white-space: nowrap;
    font-weight: 500;
}

</style>
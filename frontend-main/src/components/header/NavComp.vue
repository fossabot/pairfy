<template>
        <div class="nav flex">
            <div class="categories flex">
                <div class="button flex"><i class="pi pi-bars" /></div>
                <span>All Categories</span>
                <div class="arrow flex">
                    <i class="pi pi-angle-down" />
                </div>
            </div>
            <span>New Discounts</span>
            <span>Earn Rewards</span>
            <span>Sell Products</span>
            <span>Help Center</span>
            <span>
                <a href="https://cardano-ecommerce.gitbook.io/marketplace" target="_blank"
                    rel="noopener noreferrer">Documentation</a>
            </span>
            <span>Electronics</span>
            <span>Best Sellers</span>
            <span>Home</span>
            <span>NFT</span>
            <span>{{ getADAprice }} ADA</span>
        </div>
   
</template>

<script setup>
import headerAPI from "@/components/header/api/index";

const { getADAprice } = headerAPI();


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

.categories {
    background: var(--background-b);
    white-space: nowrap;
    padding: 0.5rem 1rem;
    border-radius: 20px;

}
.ADA {
    white-space: nowrap;
    font-weight: 500;
}
</style>
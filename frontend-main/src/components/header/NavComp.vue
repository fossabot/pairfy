<template>
    <div class="row flex">
        <div class="nav">
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
            <span>Documentation</span>
        </div>
        <div class="ADA"> ₳ {{ getADAprice }} USD</div>
    </div>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import { NETWORK } from "@/api";

const { getADAprice } = headerAPI();
</script>

<style lang="css" scoped>
.nav {
    display: flex;
    align-items: center;
}

.nav span {
    margin: 0 2rem;
    font-size: var(--text-size-1);
    cursor: pointer;
    font-weight: 500;
}

.categories {
    background: var(--background-b);
    white-space: nowrap;
    padding: 0.5rem 1rem;
    border-radius: 20px;

}

.row {
    justify-content: space-between;
}
</style>
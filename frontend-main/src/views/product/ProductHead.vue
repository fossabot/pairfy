<template>
    <div class="p-head flex">
        <span>Home</span>
        <div class="flex">
            <i class="pi pi-angle-right" />
        </div>
        <span>Categories</span>
        <div class="flex">
            <i class="pi pi-angle-right" />
        </div>
        <span>{{ getProductData?.category }}</span>
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';

const { getProductData } = productAPI();

</script>

<style lang="css" scoped>
.p-head {
    background: var(--background-b);
    font-size: var(--text-size-0);
    text-transform: capitalize;
    padding: 1rem;
}

.p-head div {
    margin: 0 0.5rem;
}

</style>
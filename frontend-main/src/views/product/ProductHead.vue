<template>
    <div class="p-head flex">
        <span>Home</span>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </div>
        <span>Categories</span>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
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
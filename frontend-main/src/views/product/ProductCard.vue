<template>
    <div class="p-card" v-if="getProductData">
        <ProductMedia />
        <ProductInfo />
        <BuyModule />
    </div>

    <div class="p-card-loader" v-else>
        <LoadingComp />
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';
import BuyModule from "@/views/product/BuyModule.vue"
import LoadingComp from '@/components/LoadingComp.vue';
import ProductMedia from '@/views/product/ProductMedia.vue';
import ProductInfo from './ProductInfo.vue';

const { getProductData } = productAPI();

</script>

<style lang="css" scoped>
.p-card {
    display: flex;
    align-items: flex-start;
    margin-top: 1rem;
}

.p-card-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
</style>
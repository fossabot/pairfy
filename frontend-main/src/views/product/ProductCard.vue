<template>
    <div class="p-card" v-if="getProductData">
        <MediaModule />
        <PreviewModule />
        <BuyModule />
    </div>

    <div class="p-card-loader" v-else>
        <LoadingComp />
    </div>
</template>

<script setup>
import MediaModule from './MediaModule.vue';
import PreviewModule from './PreviewModule.vue';
import productAPI from '@/views/product/api/index';
import BuyModule from "@/views/product/BuyModule.vue"
import LoadingComp from '@/components/LoadingComp.vue';

const { getProductData } = productAPI();

</script>

<style lang="css" scoped>
.p-card {
    align-items: center;
    display: flex;
}

.p-card-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
</style>
<template>
    <Skeleton v-if="!getProductData" width="100%" height="500px" />
    <section v-if="getProductData">
        <MediaModule />
        <PreviewModule />
    </section>
</template>

<script setup>
import MediaModule from './MediaModule.vue';
import PreviewModule from './PreviewModule.vue';
import productAPI from '@/views/product/api/index';


const { getProductData } = productAPI();


</script>

<style lang="css" scoped>
section {
    display: grid;
    grid-template-columns: 600px 1fr;
    gap: 1rem;
}
</style>
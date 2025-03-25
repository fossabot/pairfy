<template>
    <div class="p-card" v-if="getProductData">
        <section>
            <MediaModule />
            <PreviewModule />
        </section>

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
section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.p-card-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}


.p-card {
    display: grid;
    grid-template-columns: 80% 20%;
    box-sizing: border-box;
    padding-bottom: 50px;
    margin-top: 1rem;

}
</style>
<template>
    <div class="p-card" v-if="getProductData">
        <ProductMedia />
        <ProductMediaMobile />
        <ProductInfo />
        <ProductBuy />
    </div>

    <div class="p-card-loader" v-else>
        <LoadingComp />
    </div>
</template>

<script setup>
import ProductMediaMobile from '@/views/product/ProductMediaMobile.vue';
import ProductMedia from '@/views/product/ProductMedia.vue';
import ProductInfo from '@/views/product/ProductInfo.vue';
import ProductBuy from "@/views/product/ProductBuy.vue";
import LoadingComp from '@/components/LoadingComp.vue';
import productAPI from '@/views/product/api/index';


const { getProductData } = productAPI();

</script>

<style lang="css" scoped>
.p-card {
    align-items: flex-start;
    margin-top: 1rem;
    display: flex;
}

.p-card-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}


/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
    .p-card {
        flex-direction: column;
    }
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
    /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
    /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
    /* Styles for large screens */
}
</style>
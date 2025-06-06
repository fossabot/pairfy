<template>
    <div class="body">
        <div class="container">
            <ProductHead />
            <ProductCard />
            <Divider />
            <DescriptionComp />
        </div>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import DescriptionComp from '@/views/product/DescriptionComp.vue';
import ProductCard from '@/views/product/ProductCard.vue';
import ProductHead from '@/views/product/ProductHead.vue';
import productAPI from '@/views/product/api/index';
import { onBeforeUnmount, ref, watch } from "vue";
import { useQuery } from '@vue/apollo-composable'
import { useToast } from "primevue/usetoast";
import { useRoute } from 'vue-router';

const toast = useToast();

const route = useRoute();

const { setProductData, getArrivalDate } = productAPI();

const queryVariablesRef = ref({
    "getProductVariable": {
        "id": null
    }
})
const queryEnabled = ref(false)

const { result: getProductResult, onError: onGetProductError } = useQuery(gql`
query ($getProductVariable: GetProductInput!) {
    getProduct(getProductInput: $getProductVariable) {
        success
        payload { 
            id
            name
            price
            sku
            model
            brand
            features
            category
            keywords
            bullet_list
            paused
            color
            color_name
            quality
            country
            media_url
            image_path
            image_set
            video_set
            discount
            discount_value
            rating
            reviews
            best_seller
            sold
            available
        }
    }
}
`,
    () => (queryVariablesRef.value)
    ,
    () => ({
        enabled: queryEnabled.value,
        clientId: 'query'
    })
);


const updateQueryVariables = (id) => {
    queryVariablesRef.value = {
        getProductVariable: {
            id
        }
    }
}

const unwatchRoute = watch(
    () => route.params.id,
    (id) => {
        if (id) {
            queryEnabled.value = true;
            updateQueryVariables(id)
        }
    },
    { immediate: true }
);

const unwatchGetProduct = watch(getProductResult, value => {
    if (value) {
        setProductData(value.getProduct.payload)

        getArrivalDate({
            "origin": "Bogotá, Cundinamarca, CO"
        })
    }
})

onGetProductError(error => {
    showError(error);
})


const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000, closable: true });
};

onBeforeUnmount(() => {
    unwatchRoute()
    unwatchGetProduct()
})

</script>

<style lang="css" scoped>
.body {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.container {
    max-width: var(--body-a);
    flex-direction: column;
    margin-top: 1rem;
    overflow: hidden;
    display: flex;
    width: 100%;
    height: auto;
    z-index: 10;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
    .container {
        margin: initial;
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
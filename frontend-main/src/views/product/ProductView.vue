<template>
    <div class="body">
        <div class="container">
            <HeadComp />
            <ProductCard />
            <Divider />
            <DescriptionComp />
        </div>
    </div>
</template>

<script setup>
import DescriptionComp from '@/views/product/DescriptionComp.vue';
import ProductCard from '@/views/product/ProductCard.vue';
import HeadComp from '@/views/product/HeadComp.vue';
import productAPI from '@/views/product/api/index';
import gql from 'graphql-tag';
import { onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable'
import { useToast } from "primevue/usetoast";


const toast = useToast();

const route = useRoute();

const { setProductData } = productAPI();

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
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.container {
    background: var(--background-a);
    box-shadow: var(--shadow-b);
    flex-direction: column;
    max-width: var(--body-a);
    position: relative;
    border-radius: 6px;
    display: flex;
    width: 100%;
    height: auto;
    z-index: 10;
    overflow: hidden;
    margin-top: 1.5rem;
    padding: 1.5rem;
}
</style>
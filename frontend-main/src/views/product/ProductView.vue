<template>
    <div class="body">
        <div class="container">
            <div class="card-header">
                <span @click="backRoute">Back</span>
                <div class="flex" style="margin: 0 0.5rem;">
                    <i class="pi pi-angle-right" />
                </div>
                <span>Home</span>
                <div class="flex" style="margin: 0 0.5rem;">
                    <i class="pi pi-angle-right" />
                </div>
                <span>Categories</span>
                <div class="flex" style="margin: 0 0.5rem;">
                    <i class="pi pi-angle-right" />
                </div>
                <span>{{ getProductData?.category }}</span>
            </div>
            <div class="card">
                <div class="card-left">
                    <ProductCard />
                    <Divider />
                    <DescriptionModule />
                </div>
                <div class="card-right">
                    <BuyModule />
                </div>
            </div>

            <div class="footer">

            </div>
        </div>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import productAPI from '@/views/product/api/index';
import DescriptionModule from '@/views/product/DescriptionModule.vue';
import ProductCard from '@/views/product/ProductCard.vue';
import BuyModule from "@/views/product/BuyModule.vue"
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable'
import { onBeforeUnmount, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const { setProductData, getProductData } = productAPI();

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000, closable: false });
};

const route = useRoute()

const router = useRouter()

const backRoute = () => {
    router.go(-1)
}

const queryVariablesRef = ref({
    "getProductVariable": {
        "id": null
    }
})
const queryEnabled = ref(false)

const { result: getProductResult, onError: onGetProductError } = useQuery(gql`
query ($getProductVariable: GetProductInput!) {
    getProduct(getProductInput: $getProductVariable) {
        id
        name
        price
        collateral
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

watch(
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
        setProductData(value.getProduct)
    }
})

onGetProductError(error => {
    showError(error);
})

onBeforeUnmount(() => unwatchGetProduct())

</script>

<style lang="css" scoped>
.body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-a);
    background: var(--background-b);
}

.mask {
    height: 150px;
    width: inherit;
    position: relative;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: 15%;
}

.container {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    max-width: 1600px;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 10;
    overflow: hidden;

}

.card-header {
    padding: 1rem;
    display: flex;
    align-items: center;
    background: linear-gradient(96.76deg, color-mix(in srgb, var(--yellow-a), transparent 80%), color-mix(in srgb, var(--yellow-a), transparent 90%));
    background: var(--background-b);
    font-size: var(--text-size-1);

}

.card {
    display: grid;
    grid-template-columns: 80% 20%;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 2rem;
    background: var(--background-a);
}

.card-left {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.card-right {
    min-height: 100vh;
}

.footer {
    height: 200px;
    display: flex;
}
</style>
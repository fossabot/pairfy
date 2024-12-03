<template>
    <div class="buy">


        <Skeleton v-if="!getProductData" width="100%" height="500px" />

        <div v-if="getProductData">

            <div class="buy-legend">
                SKU: {{ getProductData.sku.split(":")[0] }}
            </div>
            <div class="buy-legend">
                Model: {{ getProductData.model }}
            </div>
            <div class="buy-legend">
                Brand: {{ getProductData.brand }}
            </div>
            <div class="buy-legend">
                Collateral: {{ getProductData.collateral }} USD
            </div>

            <div class="buy-legend">
                Keeping Stock: 15
            </div>
            <div class="buy-legend">
                Available: 15
            </div>
            <div class="buy-control">
                <Select v-model="selectedQuantity" :options="quantityOptions" optionLabel="name" placeholder="Units"
                    variant="filled" size="small" />
                <Button label="Buy Now" fluid @click="openBuyDialog" />
                <Button label="Add to Cart" fluid outlined />
            </div>
        </div>
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';
import { ref } from "vue";

const { getProductData } = productAPI();

const selectedQuantity = ref({ name: '1', code: 1 });

const quantityOptions = ref([
    { name: '1', code: 1 },
    { name: '2', code: 2 },
    { name: '3', code: 3 },
    { name: '4', code: 4 },
    { name: '5', code: 5 },
    { name: '6', code: 6 },
    { name: '7', code: 7 },
    { name: '8', code: 8 },
    { name: '9', code: 9 },
    { name: '10', code: 10 }
]);

</script>

<style lang="css" scoped>
.buy {
    border: 1px solid var(--border-a);
    border-radius: 8px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.buy-control {
    display: grid;
    gap: 0.5rem;
    margin-top: 2rem;
}

.buy-legend {
    display: flex;
    font-size: var(--text-size-a);
    line-height: 1.5rem;
}
</style>
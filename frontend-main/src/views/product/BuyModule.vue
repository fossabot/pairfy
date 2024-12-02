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
            <div class="buy-control">
                <Button label="Buy Now" fluid />
                <Button label="Add to Cart" fluid outlined />
            </div>
        </div>
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';

const { getProductData } = productAPI();

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
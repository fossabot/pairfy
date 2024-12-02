<template>
    <div class="buy">
        <div class="buy-top">
        
        </div>

        <Skeleton v-if="!getProductData" width="100%" height="500px" />

        <div v-if="getProductData">
            <div>
                {{ getProductData.sku.split(":")[0] }}
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
}

.buy-top {
    display: flex;
    color: var(--text-b);
    font-size: var(--text-size-a);
}
</style>
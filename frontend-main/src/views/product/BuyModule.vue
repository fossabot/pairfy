<template>
    <div class="buy">
        <span>Stock</span>
        <span>Available Stock</span>
        <span>Quantity</span>
        <div class="buy-control">
            <Button label="Buy Now" fluid />
            <Button label="Add to Cart" fluid outlined />
        </div>
        <span>seller</span>
        <span>legends</span>
      
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
</style>
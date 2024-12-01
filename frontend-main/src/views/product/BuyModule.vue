<template>
    <div class="buy">
        <span>Stock</span>
        <span>Stock</span>
        <span>Quantity</span>
        <Button label="Buy Now" fluid />
        <Button label="Add to Cart" fluid outlined />

        <span>seller</span>
        <span>legends</span>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.buy {
    border: 1px solid var(--border-a);
    border-radius: 8px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
}
</style>
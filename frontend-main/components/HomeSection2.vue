<template>
    <div class="HomeSection2">
        <ProductCarousel title="Top 20 most purchased by the community" />
        <DividerComp />
        <ProductGrid title="Community's best-selling" />
        <DividerComp />
        <CategoryComp />
        <DividerComp />
        <ProductCarousel title="Household products most used" />
        <DividerComp />
        <ProductCarousel title="Office and work items you may need" />
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.HomeSection2 {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    display: flex;
    width: 100%;
}
</style>
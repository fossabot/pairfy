<template>
    <div class="HomeSection2">
        <ProductCarousel title="Technology products purchased by the community" />
        <DividerComp />
        <ProductCarousel title="Office and work items you may need" />
        <DividerComp />
        <ProductGrid title="Community's best-selling" />
        <DividerComp />
        <CategoryComp />
        <DividerComp />
        <ProductCarousel title="Household products most used" />
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
    padding-top: 2rem;
    display: flex;
    width: 100%;
}
</style>
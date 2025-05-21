<template>
    <div class="HomeSection2">
        <DividerComp />
        <ProductCarousel title="Most purchased by the community" /> 
        <DividerComp />
        <ProductGrid title="Best sellers of the month" />
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
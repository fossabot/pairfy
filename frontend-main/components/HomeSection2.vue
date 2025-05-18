<template>
    <div class="HomeSection2">
        <ProductCarousel title="Technology products purchased by the community" />
        <ProductCarousel title="Office and work products you may need" />
        <ProductGrid title="Best sellers of recent months" />
        <CategoryComp />
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
    display: flex;
    width: 100%;
}
</style>
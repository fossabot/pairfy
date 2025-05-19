<template>
  <div class="ProductPage">
    <div class="ProductPage-body">
      xxxxxxxxx
    </div>
  </div>
  <FooterComp />
</template>

<script setup>
useHead({
  title: 'Pairfy - Cardano marketplace',
  meta: [
    { name: 'description', content: 'Buy and sell products on Cardano blockchain.' }
  ]
})
</script>

<style lang="css" scoped>
.ProductPage {
  background: var(--background-b);
  justify-content: center;
  display: flex;
  width: 100%;
}

.ProductPage-body {
  background: var(--background-a);
  max-width: var(--body-a);
  min-height: 100vh;
  width: inherit;
}
</style>
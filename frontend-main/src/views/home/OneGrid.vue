<template>
  <div class="grid">
    <ItemCard />
    <ItemCard />
    <ItemCard />
    <ItemCard />
    <ItemCard />
    <ItemCard />
    <ItemCard />
    <ItemCard />
  </div>
</template>

<script setup>
import ItemCard from '@/views/home/ItemCard.vue';



</script>

<style lang="css" scoped>
.grid {
  max-width: 1600px;
  width: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  min-height: 100vh;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 400px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
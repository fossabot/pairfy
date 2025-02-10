<template>
  <div class="grid">
    <ItemCard v-for="item, index in content" :key="index" :content="item"/>
  </div>
</template>

<script setup>
import ItemCard from '@/views/home/ItemCard.vue';
import { ref } from 'vue';

const props = defineProps(['content'])


</script>

<style lang="css" scoped>
.grid {
  max-width: var(--body-a);
  width: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  display: grid;
  gap: 0.5rem;
  row-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: auto;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
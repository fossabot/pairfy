<template>
  <div class="grid">
    <ItemCard v-for="item, index in content" :key="index" :content="item" :style="{ minHeight: '236.67px', maxHeight: '100%' }"/>
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
  gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  grid-auto-rows: auto;
  padding: 1rem;
  background: var(--background-a);
  box-shadow: var(--shadow-b);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  }
}
</style>
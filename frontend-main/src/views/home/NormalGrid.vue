<template>
  <div class="box">
    <div class="title flex">
      <span>{{ props.title }}</span>
      <img class="icon" src="@/assets/icons/hot.png" alt="">
    </div>
    <Divider />
    <div class="grid">
      <ItemCard v-for="item, index in content" :key="index" :content="item"
        :style="{ minHeight: '100%', maxHeight: '100%' }" />
    </div>
  </div>
</template>

<script setup>
import ItemCard from '@/views/home/ItemCard.vue';
import { ref } from 'vue';

const props = defineProps(['content', 'title'])


</script>

<style lang="css" scoped>
.box {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.title {
  font-size: var(--text-size-4);
  font-weight: 700;
}

.grid {
  max-width: var(--body-a);
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  grid-auto-rows: auto;
  display: grid;
  width: 100%;
  gap: 1rem;
  row-gap: 2rem;
}

.icon {
    width: 34px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }
}

@media (min-width: 1230px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }
}
</style>
<template>
  <div class="box">
    <div class="title flex">
      <span>{{ props.title }}</span>
      <div class="icon flex">
        <img src="@/assets/icons/hot.png" alt="">
      </div>
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
  display: grid;
  width: 100%;
  gap: 1rem;
  row-gap: 2rem;
}

.icon {
  background: var(--pastel-barely-blush);
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  width: 3rem;
}

.icon img {
  width: 2rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (min-width: 1230px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
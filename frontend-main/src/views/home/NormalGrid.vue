<template>
  <div class="normal">
    <div class="title flex" v-if="visibleTitle">
      <span>{{ props.title }}</span>
      <div class="icon flex">
        <img src="@/assets/icons/hot.png" alt="">
      </div>
    </div>

    <div class="grid">
      <ItemCard v-for="item, index in content" :key="index" :content="item"
        :style="{ minHeight: '100%', maxHeight: '100%' }" />
    </div>
  </div>
</template>

<script setup>
import ItemCard from '@/views/home/ItemCard.vue';
import { ref } from 'vue';

const props = defineProps(['content', 'title', 'visibleTitle'])


</script>

<style lang="css" scoped>
.normal {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: var(--text-size-5);
  font-weight: 700;
  margin: 1.5rem 0;
}

.grid {
  max-width: var(--body-a);
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  grid-auto-rows: auto;
  border-radius: 0px;
  display: grid;
  width: 100%;
  gap: 1rem;
  row-gap: 2rem;
}

.icon {
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  display: flex;
  width: 3rem;
}

.icon img {
  width: 2rem;
}


@media (max-width: 480px) {
  .normal {
    padding: 0 0.5rem;
  }

  .title {
    font-size: var(--text-size-3);
    margin: 1rem 0;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    row-gap: 1rem;
  }
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
  /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
  /* Styles for large screens */
}
</style>
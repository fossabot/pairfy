<template>
  <div class="grid">
    <ItemCard v-for="item in itemList" :key="item" :content="item"/>
  </div>
</template>

<script setup>
import ItemCard from '@/views/home/ItemCard.vue';
import { ref } from 'vue';

const itemList = ref([
  {
    title: "Libros educativos para niños...",
    image: "https://ae01.alicdn.com/kf/Sbeea600553724205913a3ec0acf666f2c.jpg_760x760q75.jpg",
    price: 8,
    alt: "image-alt",
    discount: true,
    discount_value: 12
  },
  {
    title: "Lenovo 2TB USB 3.0 Metal Flash...",
    image: "https://ae01.alicdn.com/kf/S0d3e660261154feea17c3afbf67410e4e.jpg_760x760q75.jpg",
    price: 5,
    alt: "image-alt",
    discount: true,
    discount_value: 15
  },
  {
    title: "The Psychology of Money Timeless...",
    image: "https://ae01.alicdn.com/kf/S84119b3c3608458384008cd3cc0f75a5k.jpg_760x760q75.jpg",
    price: 15,
    alt: "image-alt",
    discount: false,
    discount_value: 11
  },
  {
    title: "Original Lenovo SD 1TB Micro TF...",
    image: "https://ae01.alicdn.com/kf/Sf5d0ad88d9a84e9798196cd3b3070f4aC.jpg_760x760q75.jpg",
    price: 25,
    alt: "image-alt",
    discount: true,
    discount_value: 10
  },
  {
    title: "Xiaomi Smart Sunglasses Glasses...",
    image: "https://ae01.alicdn.com/kf/S3a669ddd04d64ed5b8bf5ce64da38d447.jpg_760x760q75.jpg",
    price: 31,
    alt: "image-alt",
    discount: false,
    discount_value: 5
  },
  {
    title: "Electric Water Guns For Adults...",
    image: "https://ae01.alicdn.com/kf/S5313b22b8b9f468391bc4cba156ccfd54.jpg_760x760q75.jpg",
    price: 25,
    alt: "image-alt",
    discount: true,
    discount_value: 3
  },
  {
    title: "Original Lenovo SD 1TB Micro TF...",
    image: "https://ae01.alicdn.com/kf/S9ebb570a04844947abf0b22d4ef7d2b9G.jpg_760x760q75.jpg",
    price: 25,
    alt: "image-alt",
    discount: true,
    discount_value: 8
  },
  {
    title: "SONY Micro SD Card Mini Memory...",
    image: "https://ae01.alicdn.com/kf/S5ac929e1a8f243f09949516dbc5b2b89Y.jpg_760x760q75.jpg",
    price: 37,
    alt: "image-alt",
    discount: false,
    discount_value: 6
  },
  {
    title: "Dental Floss Portable Cordless F18...",
    image: "https://ae01.alicdn.com/kf/Sd193438965ed49dc94811b8ba5f99ca73.jpg_q75.jpg",
    price: 51,
    alt: "image-alt",
    discount: true,
    discount_value: 7
  },
  {
    title: "Original Lenovo SD 1TB Micro TF...",
    image: "https://ae01.alicdn.com/kf/Sf5d0ad88d9a84e9798196cd3b3070f4aC.jpg_760x760q75.jpg",
    price: 25,
    alt: "image-alt",
    discount: true,
    discount_value: 10
  },
  {
    title: "The Psychology of Money Timeless...",
    image: "https://ae01.alicdn.com/kf/S84119b3c3608458384008cd3cc0f75a5k.jpg_760x760q75.jpg",
    price: 15,
    alt: "image-alt",
    discount: false,
    discount_value: 11
  },
  {
    title: "The Psychology of Money Timeless...",
    image: "https://ae01.alicdn.com/kf/S272f7ee82a884b4f92d1e1f56d118c14t.jpg_q75.jpg",
    price: 15,
    alt: "image-alt",
    discount: false,
    discount_value: 11
  },
])

</script>

<style lang="css" scoped>
.grid {
  max-width: var(--body-a);
  width: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  display: grid;
  gap: 1rem;
  row-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
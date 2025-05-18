<template>
  <div class="carousel-wrapper">
    <div class="container">
      <h2 class="carousel-title">{{ title }}</h2>

      <div class="carousel-container">
        <button class="nav left" @click="scrollLeft">&#10094;</button>

        <div class="carousel" ref="carousel">
          <div class="carousel-item" v-for="(image, index) in images" :key="index">
            <img :src="image" alt="Product" />
          </div>
        </div>

        <button class="nav right" @click="scrollRight">&#10095;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title?: string
}>()

const images = [
  "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",

]

const carousel = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  carousel.value?.scrollBy({ left: -600, behavior: 'smooth' })
}

const scrollRight = () => {
  carousel.value?.scrollBy({ left: 600, behavior: 'smooth' })
}
</script>

<style scoped>
.carousel-wrapper {
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  box-sizing: border-box;
  max-width: var(--body-a);
  background: var(--background-a);
  border: 1px solid var(--border-a);
  border-radius: var(--radius-c);
}

.carousel-title {
  font-size: var(--text-size-5);
  font-weight: 700;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1rem;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 auto;
  width: 300px;
  height: 200px;
  overflow: hidden;
  background: var(--background-a);
  border-radius: var(--radius-c);
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.nav.left {
  left: 0;
}

.nav.right {
  right: 0;
}
</style>

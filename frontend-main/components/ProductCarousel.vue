<template>
    <div class="carousel-container">
      <button class="nav left" @click="scrollLeft">&#10094;</button>
  
      <div class="carousel" ref="carousel">
        <div
          class="carousel-item"
          v-for="(image, index) in images"
          :key="index"
        >
          <img :src="image" alt="Product" />
        </div>
      </div>
  
      <button class="nav right" @click="scrollRight">&#10095;</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const images = [
    'https://picsum.photos/id/1015/300/180',
    'https://picsum.photos/id/1020/300/180',
    'https://picsum.photos/id/1031/300/180',
    'https://picsum.photos/id/1050/300/180',
    'https://picsum.photos/id/1062/300/180',
    'https://picsum.photos/id/1074/300/180',
    'https://picsum.photos/id/1074/300/180',
    'https://picsum.photos/id/1074/300/180',
  ]
  
  const carousel = ref<HTMLElement | null>(null)
  
  const scrollLeft = () => {
    carousel.value?.scrollBy({ left: -300, behavior: 'smooth' })
  }
  
  const scrollRight = () => {
    carousel.value?.scrollBy({ left: 300, behavior: 'smooth' })
  }
  </script>
  
  <style scoped>
  .carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 1rem 0;
  }
  
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 1rem;
    padding: 0 2.5rem;
  }
  
  .carousel::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-item {
    flex: 0 0 auto;
    width: 300px;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
    background: #f5f5f5;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
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
  
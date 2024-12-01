<script setup>
import { RouterView } from 'vue-router'
import HeaderComp from '@/components/HeaderComp.vue';
</script>


<template>
  <div class="wrapper">
    <HeaderComp />
    <div class="wrapper-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all .2s ease;
}

.wrapper-content {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

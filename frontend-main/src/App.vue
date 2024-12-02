<script setup>
import { RouterView } from 'vue-router'
import HeaderComp from '@/components/HeaderComp.vue';
</script>


<template>
  <div class="wrapper">
    <HeaderComp />
    <RouterView />
  </div>
</template>

<style scoped>

.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all .2s ease;
  flex: 1;
  height: 100%;
}

.wrapper-content {

}
</style>

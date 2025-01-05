<template>
  <main>
    <div class="body">
      <div class="banner">
      </div>
      <div class="bottom">
        <OneGrid />
      </div>
    </div>
  </main>
</template>

<script setup>
import OneGrid from '@/views/home/OneGrid.vue' 


</script>

<style lang="css" scoped>
main {
  background: var(--background-b);
  min-height: 100vh;
  display: grid;
  width: 100%;
  border-top: 1px solid var(--border-a);
}

.banner {
  min-height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
  /*background: url('@/assets/banner.webp');*/
  background-size: cover;
}

.bottom {
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0) 30%); 
}
</style>
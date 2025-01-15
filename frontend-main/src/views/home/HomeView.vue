<template>
  <main>
    <div class="body">
      <div class="top">
        <BandComp />
      </div>
      <div class="bottom">
        <CategoryComp />
        <OneGrid />
        <FourGrid />
        <OneGrid />
      </div>
    
    </div>
  </main>
</template>

<script setup>
import OneGrid from '@/views/home/OneGrid.vue'
import BandComp from '@/views/home/BandComp.vue'
import FourGrid from '@/views/home/FourGrid.vue'
import CategoryComp from '@/views/home/CategoryComp.vue'

</script>

<style lang="css" scoped>
main {
  background: var(--background-a);
  min-height: 100vh;
  display: grid;
  width: 100%;
  border-top: 1px solid var(--border-a);
}

.body {
  padding: 1rem;
}

.top {
  min-height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>
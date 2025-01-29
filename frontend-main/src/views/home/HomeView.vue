<template>
  <main>
    <div class="body">
      <div class="top">
        <BandComp />
      </div>
      <div class="bottom">
        <CategoryComp /> 
        <TwoGrid /> 
        <OneGrid />
        <RowGrid title="Technology"/>
        <OneGrid />
        <RowGrid title="Home"/>
        <FourGrid />
        <RowGrid title="Best sellers"/>
      </div>
    
    </div>
  </main>
</template>

<script setup>
import OneGrid from '@/views/home/OneGrid.vue'
import BandComp from '@/views/home/BandComp.vue'
import FourGrid from '@/views/home/FourGrid.vue'
import TwoGrid from '@/views/home/TwoGrid.vue'
import RowGrid from '@/views/home/RowGrid.vue'
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

.top {
  min-height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
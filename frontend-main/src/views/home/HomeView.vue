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
        <RowGrid title="Office Supplies & Equipment"/>
        <OneGrid />
        <RowGrid title="Home & Garden"/>
        <OneGrid />
      </div>
    
    </div>
  </main>
</template>

<script setup>
import OneGrid from '@/views/home/NormalGrid.vue'
import BandComp from '@/views/home/BandComp.vue'
import TwoGrid from '@/views/home/TwoGrid.vue'
import RowGrid from '@/views/home/RowGrid.vue'
import CategoryComp from '@/views/home/CategoryComp.vue'

</script>

<style lang="css" scoped>
main {
  background: var(--background-b);
  min-height: 100vh;
  display: grid;
  width: 100%;
}

.top {
  min-height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
}

.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
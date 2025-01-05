<template>
  <main>
    <div class="body">
      <div class="banner">
        <BandComp/>
      </div>
      <div class="bottom">
        <OneGrid />
      </div>
    </div>
  </main>
</template>

<script setup>
import OneGrid from '@/views/home/OneGrid.vue' 
import BandComp from '@/views/home/BandComp.vue' 


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
  padding-top: 2rem;
}

.bottom {
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0) 30%); 
  padding-top: 2rem;
}
</style>
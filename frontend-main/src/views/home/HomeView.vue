<template>
  <main>
    <div class="body">
      <div class="banner">
        <BandComp/>
      </div>
      <div class="bottom">
        <OneGrid />
        <FourGrid/>
        <OneGrid />
      </div>
    </div>
  </main>
</template>

<script setup>
import OneGrid from '@/views/home/OneGrid.vue' 
import BandComp from '@/views/home/BandComp.vue' 
import FourGrid from '@/views/home/FourGrid.vue' 


</script>

<style lang="css" scoped>
main {
  background: var(--background-b);
  min-height: 100vh;
  display: grid;
  width: 100%;
  border-top: 1px solid var(--border-a);
}

.body{
  padding: 1rem;
}

.banner {
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
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0) 30%); 
}
</style>
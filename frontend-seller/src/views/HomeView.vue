<template>
  <main>

    <CarpetComp :tabs="['Product List', 'Statistics']" :icons="['pi-clipboard', 'pi-gauge']" />

  </main>
</template>


<style scoped>
main {
  padding: 0.25rem;
}
</style>


<script setup>
import CarpetComp from "@/components/CarpetComp.vue";
import { ref } from "vue";




</script>
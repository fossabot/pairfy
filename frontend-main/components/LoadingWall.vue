<template>
   <div class="loading-wall center">
    <LoadingComp  :size="32" :border-width="3" style="margin-top: 5rem;"/>
   </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.loading-wall {
  height: 100vh;
  width: inherit;
  max-width: var(--body-a);
}

</style>
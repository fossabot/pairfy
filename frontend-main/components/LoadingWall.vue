<template>
   <div class="LoadingWall center">
    <LoadingComp  :size="32" :border-width="3" style="margin-top: 5rem;"/>
   </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.LoadingWall {
  min-height: 100vh;
  height: 100%;
  width: inherit;
  max-width: var(--body-a);
}

</style>
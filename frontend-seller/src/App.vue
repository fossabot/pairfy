<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <div class="wrapper">
    <NavMenu />

    <div class="wrapper-content">
      <RouterView />
    </div>

  </div>

</template>

<style scoped>
* {
  box-sizing: border-box;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.wrapper {
  height: 100vh;
  display: flex;
  transition: all .2s ease;
}

.wrapper-content {
  flex: 1;
  height: 100%;
  overflow: auto;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

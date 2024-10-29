<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <NavMenu />

      <div class="wrapper-content">
        <RouterView />
      </div>

    </div>
  </header>


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
  width: 100%;
  height: 100%;
  background: red;
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

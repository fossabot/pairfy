<template>
  <main>
    <div class="body">
      <div class="banner">

      </div>

      <div class="bottom">
        <div class="grid">
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

</script>

<style lang="css" scoped>
main {
  background: var(--background-b);
  min-height: 100vh;
  display: grid;
  width: 100%;
}

.banner {
  min-height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
  background: url('@/assets/banner.webp');
  background-size: cover;
}

.bottom {
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #ededed 0%, rgba(0, 0, 0, 0) 30%);
}

.grid {
  max-width: 1600px;
  width: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  min-height: 100vh;
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 400px;
}

.grid-item {
  background: var(--background-a);
  border-radius: 8px;
  box-shadow: 0 2px 24px rgba(24, 32, 82, .05);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
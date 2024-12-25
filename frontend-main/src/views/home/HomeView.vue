<template>
  <main>
    <div class="panel">

    </div>

    <div class="body">
      <div class="banner">
        <div class="banner-body">
          <div class="title">Next Cardano Black Day</div>
          <div class="counter">
            <span class="prefix">
              000
            </span>
            <div>2053 ADA Liquidity</div>
          </div>
        </div>
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
  background: var(--background-c);
  min-height: 100vh;
  display: grid;
  /**grid-template-columns: 16vw 1fr;*/
  width: 100%;
}

.banner {
  min-height: 250px;
  justify-content: center;
  display: flex;
  align-items: center;
}

.banner-body {
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: var(--text-size-6);
  font-weight: 700;
  color: var(--text-w);
}

.counter {
  font-size: var(--text-size-5);
  font-weight: 600;
  display: flex;
  color: var(--primary-b)
}

.prefix {
  color: var(--text-b);
}

.bottom {
  display: flex;
  justify-content: center;
}

.grid {
  max-width: 1600px;
  width: 100%;
  background: var(--background-b);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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

.panel {
  border-right: 1px solid var(--border-a);
  display: none;
}



@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
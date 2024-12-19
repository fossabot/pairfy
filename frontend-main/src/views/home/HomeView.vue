<template>
  <main>
    <div class="panel">
      x
    </div>

    <div class="body">
      <div class="banner">
        <div class="banner-body">
          <div class="title">Next Cardano Black Day</div>
          <div class="counter">
            <span class="prefix">
              0.000.
            </span>
            <div>100 ADA Liquidity</div>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="grid-body">

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

</script>

<style lang="css" scoped>
main {
  background: var(--black-a);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 20vw 1fr;

  width: 100%;
}

.banner {
  min-height: 275px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: var(--text-w);
}

.banner-body {
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.counter {
  font-size: var(--text-size-6);
  font-weight: 600;
  display: flex;
}

.title {
  font-size: var(--text-size-7);
  font-weight: 700;
}

.prefix {
  color: var(--text-b);
}

.grid {
  padding: 1rem;
}

.grid-body {
  background: var(--background-a);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  height: 100vh;
}

.panel {
  border-right: 1px solid var(--border-b);
}
</style>
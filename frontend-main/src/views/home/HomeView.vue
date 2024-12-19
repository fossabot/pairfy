<template>
  <main>
    <div class="banner">
      <div class="banner-body">
        <div class="title">Next Black Day</div>
        <div class="counter">
          <span class="prefix">
            0.000.
          </span>
          <div>100 ADA</div>
        </div>
      </div>
    </div>
    <div class="grid">

    </div>
  </main>
</template>

<script setup>

</script>

<style lang="css" scoped>
main {
  background: var(--black-a);
  min-height: 100vh;
}

.banner {
  height: 400px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: var(--text-w);
}

.banner-body {
  display: block;
}

.counter {
  font-size: var(--text-size-5);
  font-weight: 700;
  display: flex;
}

.title {
  font-size: var(--text-size-7);
  font-weight: 700;
}

.prefix{
  color: var(--text-b);
}

.grid {
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  height: 100vh;
  background: var(--background-a);
}
</style>
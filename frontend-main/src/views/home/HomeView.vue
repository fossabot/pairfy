<template>
  <main>
    <div class="body">
      <div class="top">
        <BandComp />
      </div>

      <div class="bottom">
        <CategoryComp />
        <OneGrid />
        <div ref="target" class="target" />
        <RowGrid title="Office Supplies & Equipment" />
        <OneGrid />
        <RowGrid title="Home & Garden" />
        <OneGrid />
      </div>

    </div>
  </main>
</template>

<script setup>
import OneGrid from '@/views/home/NormalGrid.vue'
import BandComp from '@/views/home/BandComp.vue'
import RowGrid from '@/views/home/RowGrid.vue'
import CategoryComp from '@/views/home/CategoryComp.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

const root = ref(null)
const target = ref(null)
const isVisible = ref(false)

const { isActive, pause, resume } = useIntersectionObserver(
  target,
  ([entry]) => {
    isVisible.value = entry?.isIntersecting || false
  },
  { root },
)

</script>

<style lang="css" scoped>
main {
  background: var(--background-b);
  min-height: 100vh;
  display: grid;
  width: 100%;
}

.top {
  min-height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
}

.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.target {
  background: transparent;
  width: 100%;
  height: 0px;
}
</style>
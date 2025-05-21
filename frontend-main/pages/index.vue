<template>
  <HomeSection1 />
  <HomeSection2 />
  <FooterComp />
</template>

<script setup lang="ts">
import Lenis from 'lenis'

let lenis: Lenis | null = null
let frameId: number

onMounted(() => {
  lenis = new Lenis({
    smooth: true,
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    frameId = requestAnimationFrame(raf)
  }

  frameId = requestAnimationFrame(raf)
})

onBeforeUnmount(() => {
  if (frameId) cancelAnimationFrame(frameId)
  lenis?.destroy()
})


useHead({
  title: 'Pairfy - Cardano marketplace',
  meta: [
    { name: 'description', content: 'Buy and sell products on Cardano blockchain.' }
  ]
})
</script>
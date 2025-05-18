<template>
  <div class="layout">
    <HeaderComp />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()

const currentPath = computed(() => route.name)

const auth = useAuthStore()

const isCollapsed = ref(true)
const isHovering = ref(false)

if (import.meta.server) {
  await auth.fetchProfile()
}
</script>

<style scoped>
.layout {
  flex-direction: column;
  height: 100vh;
}

.content {
  overflow-y: auto;
  flex: 1;
}
</style>

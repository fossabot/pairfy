<template>
  <div class="layout-entry">
    <main class="layout-entry-content">
      <slot />
    </main>
  </div>
</template>


<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

await auth.fetchProfile()
console.log('[layout-entry] Perfil cargado:', auth.seller)

</script>


<style scoped>
.layout-entry {
  background: var(--background-b);
  display: flex;
  height: 100vh;
}

.layout-entry-content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
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

if (import.meta.server) {
  await auth.fetchProfile()
  console.log('[layout-entry] Perfil cargado:', auth.seller)
}
</script>
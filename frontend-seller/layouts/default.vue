<!-- layouts/default.vue -->
<template>
  <div class="layout">
    <aside class="sidebar">
      <nav>
        <NuxtLink to="/">🏠 Home</NuxtLink><br />
        <NuxtLink to="/dashboard">📊 Dashboard</NuxtLink><br />
        <NuxtLink to="/settings">⚙️ Settings</NuxtLink>
      </nav>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'


const auth = useAuthStore()


if (import.meta.server) {
  await auth.fetchProfile()
}
</script>


<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}


.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  background: var(--primary-b);
  width: 220px;
  color: white;
  padding: 20px;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
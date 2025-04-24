<template>
  <div class="layout">
    <aside :class="['sidebar', { collapsed: isCollapsed && !isHovering }]" @mouseenter="isHovering = true"
      @mouseleave="isHovering = false">

      <div class="layout-top">
        <div class="layout-top-image">
          <img src="@/assets/brand/icon.svg" alt="">
        </div>

        <div class="layout-logo-text" :class="{ collapsed: isCollapsed && !isHovering }"
          v-show="!isCollapsed || isHovering">
          Pairfy
          <span>Marketplace</span>
        </div>
      </div>



      <nav>
        <NuxtLink to="/">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-house-icon lucide-house">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path
                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </span>
          <span class="label" :class="{ collapsed: isCollapsed && !isHovering }"
            v-show="!isCollapsed || isHovering">Home</span>
        </NuxtLink>
        <NuxtLink to="/create-product">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-circle-plus-icon lucide-circle-plus">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </span>
          <span class="label" :class="{ collapsed: isCollapsed && !isHovering }"
            v-show="!isCollapsed || isHovering">Create Product</span>
        </NuxtLink>
        <NuxtLink to="/create-product">
          <span class="icon">


            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-folder-kanban-icon lucide-folder-kanban">
              <path
                d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
              <path d="M8 10v4" />
              <path d="M12 10v2" />
              <path d="M16 10v6" />
            </svg>
          </span>
          <span class="label" :class="{ collapsed: isCollapsed && !isHovering }"
            v-show="!isCollapsed || isHovering">Product List</span>
        </NuxtLink>

        <NuxtLink to="/settings">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-package-search-icon lucide-package-search">
              <path
                d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
              <path d="m7.5 4.27 9 5.15" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
              <circle cx="18.5" cy="15.5" r="2.5" />
              <path d="M20.27 17.27 22 19" />
            </svg>
          </span>
          <span class="label" :class="{ collapsed: isCollapsed && !isHovering }"
            v-show="!isCollapsed || isHovering">Product Books</span>
        </NuxtLink>
      </nav>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const isCollapsed = ref(true)
const isHovering = ref(false)

if (import.meta.server) {
  await auth.fetchProfile()
}
</script>

<style scoped>
.layout {
  background: var(--background-b);
  display: flex;
  height: 100vh;
}

.content {
  overflow-y: auto;
  flex: 1; 
}

.sidebar {
  background: var(--primary-b);
  color: var(--text-w);
  position: relative;
  overflow: hidden;
}

nav {
  flex-direction: column;
  margin-top: 1rem;
  display: flex;
  gap: 0rem;
}

nav a {
  font-size: var(--text-size-1);
  text-decoration: none;
  color: var(--text-w);
  align-items: center;
  font-weight: 500;
  display: flex;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.icon {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 4rem;
  height: 4rem;
  min-width: 4rem;
}

.label {
  animation: fade-in 0.5s ease forwards;
  white-space: nowrap;
  padding-right: 5rem;
  visibility: initial;
}

.label.collapsed {
  visibility: hidden;
}

.layout-top {
  display: flex;
  align-items: center;
}

.layout-top-image {
  justify-content: center;
  align-items: center;
  min-width: 4rem;
  display: flex;
  height: 4rem;
  width: 4rem;
}

.layout-top-image img {
  width: 2.5rem;
}

.layout-logo-text {
  font-size: var(--text-size-3);
  white-space: nowrap;
  visibility: initial;
  font-weight: 700;
}

.layout-logo-text span {
  font-size: var(--text-size-2);
  font-weight: 300;
}

.layout-logo-text.collapsed {
  visibility: hidden;
}
</style>

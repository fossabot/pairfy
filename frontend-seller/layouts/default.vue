<template>
  <div class="layout">
    <aside :class="['sidebar', { collapsed: isCollapsed && !isHovering }]" @mouseenter="isHovering = true"
      @mouseleave="isHovering = false">

      <div class="layout-top">
        <div class="layout-top-image">
          <img src="@/assets/brand/icon.svg" alt="">
        </div>

        <span class="label" v-show="!isCollapsed || isHovering">
          <img src="@/assets/brand/logo.svg" alt="">
        </span>

      </div>



      <nav>
        <NuxtLink to="/home">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'home' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-layout-grid-icon lucide-layout-grid">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </span>
          </div>
          <span class="label" :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'home' }"
            v-show="!isCollapsed || isHovering">Home</span>
        </NuxtLink>


        <NuxtLink to="/product-list">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'product-list' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-square-chart-gantt-icon lucide-square-chart-gantt">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 8h7" />
                <path d="M8 12h6" />
                <path d="M11 16h5" />
              </svg>
            </span>
          </div>
          <span class="label"
            :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'product-list' }"
            v-show="!isCollapsed || isHovering">Products</span>
        </NuxtLink>


        <NuxtLink to="/create-product">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'create-product' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-package-plus-icon lucide-package-plus">
                <path d="M16 16h6" />
                <path d="M19 13v6" />
                <path
                  d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                <path d="m7.5 4.27 9 5.15" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" x2="12" y1="22" y2="12" />
              </svg>
            </span>
          </div>
          <span class="label"
            :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'create-product' }"
            v-show="!isCollapsed || isHovering">Create product</span>
        </NuxtLink>


        <NuxtLink to="/product-books">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'product-books' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
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
          </div>
          <span class="label"
            :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'product-books' }"
            v-show="!isCollapsed || isHovering">Product books</span>
        </NuxtLink>


        <NuxtLink to="/notifications">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'notifications' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-bell-icon lucide-bell">
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path
                  d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
            </span>
          </div>
          <span class="label"
            :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'notifications' }"
            v-show="!isCollapsed || isHovering">Notifications</span>
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
  background: var(--background-b);
  display: flex;
  height: 100vh;
}

.content {
  overflow-y: auto;
  flex: 1;
}

.sidebar {
  border-bottom-right-radius: var(--radius-c);
  border-top-right-radius: var(--radius-c);
  border-right: 1px solid var(--primary-a);
  background: var(--background-a);
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
  color: var(--text-a);
  align-items: center;
  font-weight: 500;
  display: flex;
}

nav a:hover {
  background: var(--background-b);
}

.nav-button {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 4rem;
  height: 3.5rem;
  min-width: 3rem;
}

.icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2 ease-in-out;
}

.icon.selected {
  background: var(--background-b);
  transition: 0.2 ease-in-out;
  color: var(--primary-a);
  border-radius: 50%;
}

.label {
  animation: fade-in 0.5s ease forwards;
  white-space: nowrap;
  padding-right: 3rem;
  visibility: initial;
}

.label.selected {
  color: var(--primary-a);
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
  min-width: 3rem;
  display: flex;
  height: 4rem;
  width: 4rem;
}

.layout-top-image img {
  width: 3rem;
}
</style>

<template>
  <div class="layout">
    <aside :class="['sidebar', { collapsed: isCollapsed && !isHovering }]" @mouseenter="isHovering = true"
      @mouseleave="isHovering = false">

      <div class="layout-top">
        <div class="layout-top-image">
          <img src="@/assets/brand/icon.svg" alt="">
        </div>
      </div>

      <nav>
        <NuxtLink to="/home">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'home' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </span>
          </div>
          <span class="label" :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'home' }"
            v-show="!isCollapsed || isHovering">Home</span>
        </NuxtLink>


        <NuxtLink to="/product-list">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'product-list' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grid2x2-check-icon lucide-grid-2x2-check"><path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="m16 19 2 2 4-4"/></svg>
            </span>
          </div>
          <span class="label"
            :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'product-list' }"
            v-show="!isCollapsed || isHovering">Products</span>
        </NuxtLink>


        <NuxtLink to="/product-books">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'product-books' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </span>
          </div>
          <span class="label"
            :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'product-books' }"
            v-show="!isCollapsed || isHovering">Product books</span>
        </NuxtLink>


        <NuxtLink to="/create-product">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'create-product' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            </span>
          </div>
          <span class="label"
            :class="{ collapsed: isCollapsed && !isHovering, selected: currentPath === 'create-product' }"
            v-show="!isCollapsed || isHovering">Create product</span>
        </NuxtLink>


        <NuxtLink to="/notifications">
          <div class="nav-button">
            <span class="icon" :class="{ selected: currentPath === 'notifications' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
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

*{
  transition: 0.2s ease-in-out;
}

.layout {
  background: var(--background-b);
  background: linear-gradient(135deg,
      #fff6e5 0%,
      #fbe8f9 5%,
      #e3f0ff 50%,
      #e8f4fc 80%,
      #e9fff0 100%);
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
  border-right: 1px solid var(--border-a);
  background: var(--background-a);
  box-shadow: var(--shadow-a);
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 14rem;
}

.sidebar.collapsed {
  width: 4rem;
}

nav {
  flex-direction: column;
  margin-top: 1rem;
  display: flex;
  gap: 0rem;
}

nav a {
  font-size: var(--text-size-0);
  text-decoration: none;
  color: var(--text-a);
  align-items: center;
  font-weight: 700;
  display: flex;
}

nav a:hover {
  background: var(--background-b);
  color: var(--primary-a);
}

.nav-button {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 4rem;
  height: 3.5rem;
  min-width: 4rem;
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
  min-width: 4rem;
  display: flex;
  height: 4rem;
  width: 4rem;
}

.layout-top-image img {
  width: 2.5rem;
}
</style>

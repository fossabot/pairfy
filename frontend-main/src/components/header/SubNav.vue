<template>
    <nav class="SubMenu">
      <ul class="SubMenu-body">
        <li
          v-for="item in items"
          :key="item.label"
          :class="{ active: item.route === activeRoute }"
          @click="navigateTo(item.route)"
        >
          {{ item.label }}
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  interface SubMenuItem {
    label: string
    route: string
  }
  
  const props = defineProps<{
    items: SubMenuItem[]
  }>()
  
  const router = useRouter()
  const route = useRoute()
  const activeRoute = ref(route.path)
  
  const navigateTo = (path: string) => {
    if (path !== route.path) {
      router.push(path)
    }
  }
  
  watch(() => route.path, (newPath) => {
    activeRoute.value = newPath
  })
  </script>
  
  <style scoped>
  .SubMenu {
    background-color: #f8f9fa;
    width: 100%;
    max-width: var(--body-a);
  }
  
  .SubMenu-body {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 1rem;
    margin: 0;
    background: black;
    border-bottom-left-radius: 12px;
    color: white;
    border-bottom-right-radius: 12px;
  }
  
  .SubMenu-body li {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background-color 0.2s;
  }
  
  .SubMenu-body li:hover {
    background-color: #e2e6ea;
  }
  
  .SubMenu-body li.active {
    background-color: #007bff;
    color: white;
  }
  </style>
  
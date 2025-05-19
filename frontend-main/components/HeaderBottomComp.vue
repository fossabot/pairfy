<template>
  <nav class="SubMenu">
    <ul class="SubMenu-body" :class="{ contrast: route.name === 'p' }">
      <img class="brand" src="@/assets/brand/logo.svg" alt="" @click="toHome">
      <li v-for="item in items" :key="item.label" @click="navigateTo(item.route)">
        {{ item.label }}
      </li>

      <HeaderSearchComp />
      <HeaderConnectComp />
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
.brand {
  height: 2.5rem;
}

.SubMenu {
  animation: slideDown 0.5s ease-out forwards;
  transform: translateY(-1rem);
  position: absolute;
  color: var(--text-w);
  z-index: 10000;
  width: 100%;
  opacity: 0;
  top: 0rem;
  max-width: var(--body-a);
}

@keyframes slideDown {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.SubMenu-body {
  gap: 1rem;
  margin: 0;
  display: flex;
  padding: 1.25rem;
  font-weight: 500;
  list-style: none;
  align-items: center;
  border-bottom-left-radius: var(--radius-c);
  border-bottom-right-radius: var(--radius-c);
}

.contrast {
  background: var(--gray-a);
}

.SubMenu-body li {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-b);
  transition: background-color 0.2s;
}

.SubMenu-body li:hover {
  background: rgba(255, 255, 255, 10%);
}
</style>
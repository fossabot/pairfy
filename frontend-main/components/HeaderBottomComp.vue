<template>
  <nav class="SubMenu">
    <ul class="SubMenu-body">
      <img class="brand" src="@/assets/brand/icon.svg" alt="" @click="toHome">
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
  color: var(--text-w);
}

.SubMenu {
  animation: slideDown 0.5s ease-out forwards;
  transform: translateY(-1rem);
  position: absolute;
  z-index: 10000;
  width: 100%;
  opacity: 0;
  max-width: var(--body-a);
  top: 2rem;
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
  padding: 1rem;
  display: flex;
  list-style: none;
  align-items: center;
  color: var(--text-w);
  background: var(--gray-a);
  border-bottom-left-radius: var(--radius-c);
  border-bottom-right-radius: var(--radius-c);
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.05);
}

.SubMenu-body li {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-b);
  transition: background-color 0.2s;
}

.SubMenu-body li:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
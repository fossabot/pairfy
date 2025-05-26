<template>
  <nav class="SubMenu" :class="{ contrast: isContrast }">
    <ul class="SubMenu-body" :class="{ contrast: isContrast }">
      <img class="icon" v-if="!isContrast" src="@/assets/brand/icon-white.svg" alt="" @click="navigateTo('/')">
      <img class="icon" v-if="isContrast" src="@/assets/brand/icon.svg" alt="" @click="navigateTo('/')">
      <li v-for="item in items" :key="item.label" @click="navigateTo(item.route)" :class="{ contrast: isContrast }">
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

const isContrast = computed(() =>  ['p-id', 's'].includes(route.name))

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
.icon {
  height: 2.5rem;
}

.SubMenu {
  width: 100%;
  justify-content: center;
  color: var(--text-w);
  position: absolute;
  z-index: 10000;
  display: flex;
  top: 0rem;
}

.SubMenu-body {
  gap: 1rem;
  margin: 0;
  display: flex;
  width: inherit;
  font-weight: 500;
  list-style: none;
  align-items: center;
  padding: 1rem 0;
  max-width: var(--body-a);
}

.SubMenu-body li {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-f);
  transition: background-color 0.2s;
}

.SubMenu-body li:hover {
  background: rgba(255, 255, 255, 0.1);
}




.SubMenu.contrast {
  border-bottom: 1px solid var(--border-a);
  box-shadow: 0 10px 10px 8px rgba(255, 255, 255, 90%);
  background: var(--background-a);
  position: fixed;
  top: 2rem;
}

.SubMenu-body.contrast {
  color: var(--text-a);
}

.SubMenu-body li.contrast:hover {
  color: var(--primary-a);
  background: rgba(0, 0, 0, 0.04);
}
</style>
<template>
  <div class="p-navigation" :class="{ focus: isFocus }" @mouseover="isFocus = true" @mouseleave="isFocus = false">
    <div class="p-navigation-item" :class="{ focus: isFocus, actived: isActive('home') }">
      <RouterLink to="/">
        <div class="p-navigation-image flex">
          <div class="p-navigation-mask" :class="{ actived: isActive('home') }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-house-icon lucide-house">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path
                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </div>
        </div>
        <span class="p-navigation-legend" :class="{ focus: isFocus }">Home</span>
      </RouterLink>
    </div>

    <div class="p-navigation-item" :class="{ actived: isActive('product-list') }">
      <RouterLink to="/product-list">
        <div class="p-navigation-image flex">
          <div class="p-navigation-mask" :class="{ actived: isActive('product-list') }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-check-icon lucide-folder-check"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m9 13 2 2 4-4"/></svg>
          </div>
        </div>
        <span class="p-navigation-legend" :class="{ focus: isFocus }">Product List</span>
      </RouterLink>
    </div>

    <div class="p-navigation-item" :class="{ actived: isActive('create-product') }">
      <RouterLink to="/create-product">
        <div class="p-navigation-image flex">
          <div class="p-navigation-mask" :class="{ actived: isActive('create-product') }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-circle-plus-icon lucide-circle-plus">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </div>
        </div>
        <span class="p-navigation-legend" :class="{ focus: isFocus }">Create Product</span>
      </RouterLink>
    </div>

    <div class="p-navigation-item" :class="{ actived: isActive('product-books') }">
      <RouterLink to="/product-books">
        <div class="p-navigation-image flex">
          <div class="p-navigation-mask" :class="{ actived: isActive('product-books') }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-cog-icon lucide-folder-cog"><circle cx="18" cy="18" r="3"/><path d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3"/><path d="m21.7 19.4-.9-.3"/><path d="m15.2 16.9-.9-.3"/><path d="m16.6 21.7.3-.9"/><path d="m19.1 15.2.3-.9"/><path d="m19.6 21.7-.4-1"/><path d="m16.8 15.3-.4-1"/><path d="m14.3 19.6 1-.4"/><path d="m20.7 16.8 1-.4"/></svg>
          </div>
        </div>
        <span class="p-navigation-legend" :class="{ focus: isFocus }">Product Books</span>
      </RouterLink>
    </div>


    <div class="p-navigation-item" :class="{ actived: isActive('notifications') }">
      <RouterLink to="/notifications">
        <div class="p-navigation-image flex">
          <div class="p-navigation-mask" :class="{ actived: isActive('notifications') }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-mail-icon lucide-mail">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        </div>
        <span class="p-navigation-legend" :class="{ focus: isFocus }">Notifications</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentRoute = ref("/");

const unwatchRoute = watch(
  () => route.name,
  (name) => currentRoute.value = name,
  { immediate: true }
);

const isActive = (name) => {
  return currentRoute.value === name
}
const isFocus = ref(false);

onBeforeUnmount(() => {
  unwatchRoute()
});
</script>


<style scoped>
.p-navigation {
  background: var(--primary-b);
  -webkit-user-select: none;
  align-items: flex-start;
  flex-direction: column;
  -moz-user-select: none;
  color: var(--text-w);
  user-select: none;
  transition: 0.2s;
  overflow: hidden;
  display: flex;
  margin-left: 0;
  width: 64px;
  z-index: 10;
  height: 100%;
}

.p-navigation.focus {
  width: 17rem;
}

.p-navigation-item {
  font-size: var(--text-size-1);
  align-items: center;
  position: relative;
  font-weight: 400;
  box-shadow: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  width: 100%;
}

a {
  width: 100%;
  text-decoration: none;
  justify-content: flex-start;
  border-top-left-radius: initial;
  border-bottom-left-radius: initial;
  display: flex;
  color: inherit;
  align-items: center;
  transition: 0.2s;
}

@media (hover: hover) {
  .p-navigation-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.p-navigation-item span {
  color: inherit;
}

.p-navigation-item.actived {
  color: var(--primary-a);

}

.p-navigation-image {
  justify-content: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
}

.p-navigation-mask {
  border-radius: 50%;
  background: transparent;
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-navigation-mask.actived {
  background: rgba(255, 255, 255, 0.1);
}

.p-navigation-legend {
  white-space: nowrap;
  margin-left: 0;
  opacity: 0;
}

.p-navigation-legend.focus {
  opacity: 1;
}
</style>

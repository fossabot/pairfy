<template>
  <div class="navigation" :class="{ focus: isFocus }" @mouseover="isFocus = true" @mouseleave="isFocus = false">
    <div class="navigation-item" :class="{ focus: isFocus, actived: isActive('home') }">
      <RouterLink to="/" :class="{ focus: isFocus }">
        <div class="image flex">
          <div class="image-mask" :class="{ actived: isActive('home') }">
            <img src="@/assets/icons/home.svg" alt="">
          </div>

        </div>
        <span class="legend" :class="{ focus: isFocus }">Home</span>
      </RouterLink>
    </div>

    <div class="navigation-item" :class="{ actived: isActive('product-list') }">
      <RouterLink to="/product-list" :class="{ focus: isFocus }">
        <div class="image flex">
          <div class="image-mask" :class="{ actived: isActive('product-list') }">
            <img src="@/assets/icons/market.svg" alt="">
          </div>
        </div>
        <span class="legend" :class="{ focus: isFocus }">Product List</span>
      </RouterLink>
    </div>

    <div class="navigation-item" :class="{ actived: isActive('create-product') }">
      <RouterLink to="/create-product" :class="{ focus: isFocus }">
        <div class="image flex">
          <div class="image-mask" :class="{ actived: isActive('create-product') }">
            <img src="@/assets/icons/plus.svg" alt="">
          </div>
        </div>
        <span class="legend" :class="{ focus: isFocus }">Create Product</span>
      </RouterLink>
    </div>

    <div class="navigation-item" :class="{ actived: isActive('product-books') }">
      <RouterLink to="/product-books" :class="{ focus: isFocus }">
        <div class="image flex">
          <div class="image-mask" :class="{ actived: isActive('product-books') }">
            <img src="@/assets/icons/book.svg" alt="">
          </div>
        </div>
        <span class="legend" :class="{ focus: isFocus }">Product Books</span>
      </RouterLink>
    </div>


    <div class="navigation-item" :class="{ actived: isActive('notifications') }">
      <RouterLink to="/notifications" :class="{ focus: isFocus }">
        <div class="image flex">
          <div class="image-mask" :class="{ actived: isActive('notifications') }">
            <img src="@/assets/icons/bell.svg" alt="">
          </div>
        </div>
        <span class="legend" :class="{ focus: isFocus }">Notifications</span>
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
.navigation {
  background: var(--background-b);
  margin-left: 0;
  width: 64px;
  z-index: 10;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  transition: 0.2s;
  overflow: hidden;
  color: var(--text-b);

}

.navigation.focus {
  width: 17rem;
}

.navigation-item {
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 400;
  box-shadow: none;
  cursor: pointer;
  font-size: var(--text-size-2);
  color: inherit;
}

a {
  width: 100%;
  text-decoration: none;
  transition: 0.2s;
  border-top-left-radius: initial;
  border-bottom-left-radius: initial;
  display: flex;
  align-items: center;
  color: inherit;
  justify-content: flex-start;
}

@media (hover: hover) {
  a:hover {
    background-color: var(--background-b);
  }
}

.navigation-item span {
  color: inherit;
}

.navigation-item.actived {
  color: var(--primary-a);

}

.image {
  justify-content: center;
  width: 64px;
  height: 64px;
}

.image img {
  width: var(--text-size-4);
  height: var(--text-size-4);
}

.image-mask {
  border-radius: 50%;
  background: transparent;
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-mask.actived {
  background: #d3dbe561;
}

.legend {
  display: initial;
  white-space: nowrap;
  margin-left: 0;
}

.legend.focus {}
</style>

<template>
  <div class="navigation" :class="{ focus: isFocus }"
  @mouseover="isFocus = true"
  @mouseleave="isFocus = false">
    <img class="logo" src="@/assets/logo-white.svg" alt="">
    <nav>
      <ul>
        <li :class="{ actived: currentRoute === 'home' }">
          <RouterLink to="/" :class="{ focus: isFocus }">
            <img class="icon" src="@/assets/icons/home.svg" alt="">
            <span class="legend" :class="{ focus: isFocus }">Home</span>
          </RouterLink>
        </li>

        <li :class="{ actived: currentRoute === 'product-list' }">
          <RouterLink to="/product-list" :class="{ focus: isFocus }">
            <img class="icon" src="@/assets/icons/market.svg" alt="">
            <span class="legend" :class="{ focus: isFocus }">Product List</span>
          </RouterLink>
        </li>

        <li :class="{ actived: currentRoute === 'create-product' }">
          <RouterLink to="/create-product" :class="{ focus: isFocus }">
            <img class="icon" src="@/assets/icons/plus.svg" alt="">
            <span class="legend" :class="{ focus: isFocus }">Create Product</span>
          </RouterLink>
        </li>

        <li :class="{ actived: currentRoute === 'product-books' }">
          <RouterLink to="/product-books" :class="{ focus: isFocus }">
            <img class="icon" src="@/assets/icons/book.svg" alt="">
            <span class="legend" :class="{ focus: isFocus }">Product Books</span>
          </RouterLink>
        </li>


        <li :class="{ actived: currentRoute === 'notifications' }">
          <RouterLink to="/notifications" :class="{ focus: isFocus }">
            <img class="icon" src="@/assets/icons/bell.svg" alt="">
            <span class="legend" :class="{ focus: isFocus }">Notifications</span>
          </RouterLink>
        </li>

      </ul>
    </nav>


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

const isFocus = ref(false);

onBeforeUnmount(() => {
  unwatchRoute()
});
</script>


<style scoped>
.navigation {
  background: var(--background-a);
  margin-left: 0;
  width: 64px;
  z-index: 10;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 1px 2px #1212170d;
  display: flex;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  transition: margin .4s cubic-bezier(.05, .74, .2, .99), transform .4s cubic-bezier(.05, .74, .2, .99);
}

.navigation.focus {
  width: 17rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 400;
  box-shadow: none;
  cursor: pointer;
  font-size: var(--text-size-2);
  border: 1px solid transparent;
  color: var(--text-a);
}

a {
  width: 100%;
    text-decoration: none;
    transition: 0.2s;
    border-top-left-radius: initial;
    border-bottom-left-radius: initial;
    padding: 1rem;
    display: flex;
    align-items: center;
    color: inherit;
    justify-content: center;
}

a.focus{
  justify-content: flex-start;
}



@media (hover: hover) {
  a:hover {
    background-color: var(--background-b);
  }
}

li i {
  font-size: var(--text-size-3);
  margin-right: 0.75rem;
  padding: 0.5rem 0;
}

li span {
  color: inherit;
}

.legend {
  display: none;
  margin-left: 1rem; 
}

.legend.focus {
  display: initial;
}

.icon{
  width: var(--text-size-4);
  height: var(--text-size-4);
}

.logo {
  height: 46px;
  margin-right: auto;
  margin-top: 1rem;
  margin-left: 1rem;
}

.label {
  font-size: var(--text-size-a);
  font-weight: 700;
  color: inherit;
}

.actived {
  color: var(--primary-a);
  background-color: var(--soft-blue-a);
}
</style>

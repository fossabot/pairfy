<template>
  <div class="navigation">
    <img class="logo" src="@/assets/logo-white.svg" alt="">
    <nav>
      <ul>
        <li :class="{ actived: currentRoute === 'home' }">
          <RouterLink to="/">
            <i class="pi pi-home" />
            <span>Home</span>
          </RouterLink>
        </li>

        <li :class="{ actived: currentRoute === 'product-list' }">
          <RouterLink to="/product-list">
            <i class="pi pi-list" />
            <span>Product List</span>
          </RouterLink>
        </li>

        <li :class="{ actived: currentRoute === 'create-product' }">
          <RouterLink to="/create-product">
            <i class="pi pi-plus" />
            <span>Create Product</span>
          </RouterLink>
        </li>

        <li :class="{ actived: currentRoute === 'product-books' }">
          <RouterLink to="/product-books">
            <i class="pi pi-folder" />
            <span>Product Books</span>
          </RouterLink>
        </li>


        <li :class="{ actived: currentRoute === 'notifications' }">
          <RouterLink to="/notifications">
            <i class="pi pi-bell" />
            <span>Notifications</span>
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

onBeforeUnmount(() => {
  unwatchRoute()
});
</script>


<style scoped>
.navigation {
  background: var(--background-c);
  margin-left: 0;
  width: 17rem;
  z-index: 10;
  height: 100%;
  border-radius: 0 1.5rem 1.5rem 0;
  overflow: hidden;
  box-shadow: 0 1px 2px #1212170d;
  display: flex;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  transition: margin .4s cubic-bezier(.05, .74, .2, .99), transform .4s cubic-bezier(.05, .74, .2, .99);
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
  color: var(--text-w);
}

a {
  width: 100%;
  text-decoration: none;
  transition: 0.2s;
  padding: 3px;
  border-top-left-radius: initial;
  border-bottom-left-radius: initial;
}

@media (hover: hover) {
  a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

li i {
  font-size: var(--text-size-2);
  margin-right: 0.75rem;
  padding: 0.5rem 0;
}

li span {
  color: inherit;
}

a {
  padding: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  align-items: center;
  color: inherit;
}

.logo {
  padding: 1.5rem;
}

.label {
  font-size: var(--text-size-a);
  font-weight: 700;
  color: inherit;
}

.actived {
  border-left: 2px solid var(--orange-a);
  color: var(--text-w);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, transparent 30%);
  ;
}
</style>

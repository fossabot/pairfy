<template>
  <div class="wrap">
    <img class="logo" src="@/assets/logo.svg" alt="logo">
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
.wrap {
  background-color: var(--primary-a);
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
  font-weight: 500;
  box-shadow: none;
  cursor: pointer;
  font-size: var(--text-size-a);
  border: 1px solid transparent;
}

li i {
  margin-right: 0.75rem;
  color: var(--text-w);
  padding: 0.5rem 0;
}

li span {
  color: var(--text-w);
}

a {
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
}

.logo {
  margin-bottom: 1rem;
  padding: 1rem;
}

.label {
  color: var(--text-w);
  font-size: var(--text-size-a);
  font-weight: 700;
}

.actived {
  border-left: 2px solid white;
}
</style>

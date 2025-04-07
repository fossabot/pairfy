<template>
  <nav class="p-nav">
    <ul class="p-nav-list">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/categorias">Categories</RouterLink>
      </li>
      <li>
        <RouterLink to="/ofertas">Offers</RouterLink>
      </li>
      <li>
        <RouterLink to="/nuevos">Documentation</RouterLink>
      </li>
      <li>
        <RouterLink to="/contacto">Support</RouterLink>
      </li>
      <li>
        <RouterLink to="/contacto">Sell</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>

</script>

<style scoped>
.p-nav {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
}

.p-nav-list {
  font-size: var(--text-size-1);
  justify-content: flex-start;
  max-width: var(--body-a);
  padding: 0.75rem 0rem;
  list-style: none;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
}

.p-nav-list li a {
  transition: 0.2s ease;
  text-decoration: none;
  font-weight: 400;
}

.p-nav-list li a:hover {
  font-weight: 500;
}
</style>
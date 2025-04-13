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
  width: 100%;
}

.p-nav-list {
  background: var(--background-b);
  font-size: var(--text-size-1);
  max-width: var(--body-a);
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 2rem;
}

.p-nav-list li a {
  transition: 0.2s ease;
  text-decoration: none;
}

.p-nav-list li a:hover {
  color: var(--primary-a);
}
</style>
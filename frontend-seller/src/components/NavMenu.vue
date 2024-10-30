<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="wrap">
    <img class="logo" src="@/assets/logo.svg" alt="logo">
    <nav>
      <ul>
        <li class="label">
          HOME
        </li>
        <li>
          <RouterLink to="/">
            <i class="pi pi-home"/>
            <span>Home</span>
          </RouterLink>
        </li>
        <li>

          <RouterLink to="/create-product">
            <i class="pi pi-plus"/>
            <span>Create Product</span>
          </RouterLink>
        </li>
      </ul>



    </nav>
  </div>
</template>

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
  padding: .45rem .75rem;
  box-shadow: none;
  cursor: pointer;
}

li i {
  margin-right: 0.75rem;
  color: var(--text-w);
}

li span {
  color: var(--text-w);
}

.logo {
  padding: 1rem 0.5rem;
}

.label {
  color: var(--text-w);
  font-size: var(--text-size-a);
  font-weight: 700;
}
</style>

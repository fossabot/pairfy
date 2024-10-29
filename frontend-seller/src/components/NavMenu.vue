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
    <nav>
      <ul>
        <li>
          Dashboard
        </li>
        <li>
          <RouterLink to="/"><span>Home</span></RouterLink>
        </li>
        <li>
          <i class="pi pi-plus" style="color: slateblue"></i>
          <RouterLink to="/create-product"><span>Create Product</span></RouterLink>
        </li>
      </ul>



    </nav>
  </div>
</template>

<style scoped>
.wrap {
  background-color: #020617;
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
  font-weight: 500 !important;
  padding: .45rem .75rem;
  box-shadow: none !important;
  cursor: pointer;
}

li i {
  margin-right: 1rem;
}

li span {}
</style>

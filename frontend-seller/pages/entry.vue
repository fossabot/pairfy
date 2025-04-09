<!-- pages/login.vue -->
<template>
  <div class="entry">
    <div class="entry-form">

      <div class="entry-form-image">
        <img :src="miImagen" alt="Mi imagen" />
      </div>


      <div class="entry-form-content">
        <LoginForm v-if="mode === 'login'" />
        <RegisterForm v-if="mode === 'register'" />
        <RecoveryForm v-if="mode === 'recovery'" />

        <div class="entry-form-switcher">
          <button @click="mode = 'login'">Login</button>
          <button @click="mode = 'register'">Register</button>
          <button @click="mode = 'recovery'">Recovery</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import miImagen from '@/assets/brand/icon.png'
import { ref } from 'vue'

definePageMeta({
  layout: 'entry'
})

const mode = ref('login') // 'login', 'register', 'recovery'


</script>

<style scoped>
.entry {
  justify-content: center;
  align-items: flex-start;
  display: flex;
  height: 100%;
}

.entry-form {
  background: var(--background-a);
  border-radius: var(--radius-b);
  box-shadow: var(--shadow-b);
  margin-top: 4rem;
  padding: 1.5rem;
  width: 300px;
}

.entry-form-image {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.entry-form-image img {
  width: 8rem;
}

.entry-form-content {
  flex-direction: column;
  display: flex;
}
</style>
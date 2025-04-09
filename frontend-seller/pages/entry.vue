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
          <button @click="mode = 'login'">I already have an account.</button>
          <button @click="mode = 'register'">Create a new account.</button>
          <button @click="mode = 'recovery'">Recover password.</button>
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
  box-shadow: var(--shadow-a);
  margin-top: 4rem;
  padding: 1.5rem;
  width: 300px;
}

.entry-form-image {
  justify-content: center;
  display: flex;
  padding: 1rem;
}

.entry-form-image img {
  width: 8rem;
}

.entry-form-content {
  flex-direction: column;
  display: flex;
}

.entry-form-switcher {
  flex-direction: column;
  display: flex;
  align-items: flex-start;
}

.entry-form-switcher button {
  background: transparent;
  color: var(--primary-a);
  line-height: 1.5rem;
  cursor: pointer;
  border: none;
}
</style>
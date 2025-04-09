<!-- pages/login.vue -->
<template>
  <div class="entry">
    <div class="entry-form">

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
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'entry'
})

const mode = ref('login') // 'login', 'register', 'recovery'
</script>

<style scoped>
.entry {
  justify-content: center;
  align-items: center;
  display: flex;
}

.entry-form {
  background: var(--background-a);
  border-radius: var(--radius-b);
  box-shadow: var(--shadow-b);
  padding: 1rem;
}
</style>
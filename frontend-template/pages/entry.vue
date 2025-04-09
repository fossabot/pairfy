<!-- pages/login.vue -->
<template>
  <div class="entry-container">
    <div class="entry-switcher">
      <button @click="mode = 'login'">Login</button>
      <button @click="mode = 'register'">Register</button>
      <button @click="mode = 'recovery'">Recovery</button>
    </div>

    <div class="entry-form">
      <LoginForm v-if="mode === 'login'" />
      <RegisterForm v-if="mode === 'register'" />
      <RecoveryForm v-if="mode === 'recovery'" />
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
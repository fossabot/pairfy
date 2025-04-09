<template>
  <form class="p-loginform" @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Logging in', email.value, password.value)
  // Aquí podrías llamar a tu API o usar useFetch()
}
</script>

<style scoped>
form{
  background: red;
  display: flex;
  flex-direction: column;
}
</style>
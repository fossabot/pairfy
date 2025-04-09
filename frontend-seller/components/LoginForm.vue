<template>
  <form class="p-loginform" @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    {{ auth.loading }}
    <button type="submit">Login</button>
  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'


const auth = useAuthStore()

const email = ref('')
const password = ref('')

const login = async () => {

  console.log('Logging in', email.value, password.value)
  await auth.login({ email: email.value, password: password.value })

}
</script>

<style scoped>
form {
  background: red;
  display: flex;
  flex-direction: column;
}
</style>
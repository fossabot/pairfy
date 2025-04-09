<template>
  <form class="p-loginform" @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />

    <ButtonSolid  type="button" label="Lace" @click="connectWallet" />

    <button type="submit">Login</button>
  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'

const { $wallet } = useNuxtApp()

const auth = useAuthStore()

const email = ref('')
const password = ref('')

const connectWallet = () => {
  $wallet.connect('wallet', 'lace')
}

const login = async () => {
  try {
    console.log('Logging in', email.value, password.value)

    await auth.login({ email: email.value, password: password.value })
    // Puedes redirigir si quieres:
    // const router = useRouter()
    // router.push('/')
  } catch (err) {
    console.error('Login failed:', err)
    // Mostrar errores en pantalla, opcional
  }
}


</script>

<style scoped>
form {
  background: red;
  display: flex;
  flex-direction: column;
}
</style>
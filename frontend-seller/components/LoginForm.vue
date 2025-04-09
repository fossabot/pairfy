<template>
  <form class="p-loginform" @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />

    <ButtonSolid type="button" label="Lace" @click="connectWallet('lace')" />

    <button type="submit">Login</button>
  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet'


const { $wallet } = useNuxtApp()

const auth = useAuthStore()
const wallet = useWalletStore()

const email = ref('')
const password = ref('')



const walletApi = ref(null);




const connectWallet = async (name) => {
  //$wallet.connect('wallet', 'lace')

  await wallet.connect('lace')
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
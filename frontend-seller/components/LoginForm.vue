<template>
  <form class="p-loginform" @submit.prevent="login">
    <InputEmail v-model="email" :focus="true" @valid="onValidEmail" />

    <InputPassword v-model="password" @valid="onValidPassword" />

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

const onValidEmail = (event) => {
  console.log("emailhandler", event)
}

const onValidPassword = (event) => {
  console.log("passwordhandler", event)
}

const connectWallet = async (name) => {
  //$wallet.connect('wallet', 'lace')

  try {
    await wallet.connect('lace')
    await wallet.sign()

  } catch (err) {
    console.error(err);

  }
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
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;
  display: flex;
}
</style>
<template>
  <form class="p-loginform" @submit.prevent="connectWallet">
    <InputEmail v-model="email" :focus="true" @valid="onValidEmail" />

    <InputPassword v-model="password" @valid="onValidPassword" />

    <div class="p-loginform-wallets">
      <button class="p-loginform-wallet" type="submit" v-for="wallet in walletImages" :key="wallet.name"
        @click="connectWallet(wallet.name)">
        <img :src="wallet.src" :alt="wallet.name" />
      </button>

      <div class="p-loginform-wallet" />
      <div class="p-loginform-wallet" />
      <div class="p-loginform-wallet" />
      <div class="p-loginform-wallet" />
      <div class="p-loginform-wallet" />
      <div class="p-loginform-wallet" />
      <div class="p-loginform-wallet" />
    </div>

  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet'
import eternl from '@/assets/wallets/eternl.png'
import lace from '@/assets/wallets/lace.svg'
import nami from '@/assets/wallets/nami.svg'

const walletMap = {
  eternl,
  lace,
  nami
}

const config = useRuntimeConfig()

const validWallets = config.public.validWallets

const walletImages = validWallets.map(name => ({
  name,
  src: walletMap[name] ?? ''
}))


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
    const [signature, address] = await wallet.sign()

    console.log("SIGNED", signature, address)

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

.p-loginform-wallets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 8px;
  justify-content: center;
  padding: 1rem 0;
}

.p-loginform-wallet {
  width: 50px;
  height: 50px;
  color: white;
  font-weight: bold;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-a);
}

.p-loginform-wallet img {
  width: 1.5rem;

}
</style>
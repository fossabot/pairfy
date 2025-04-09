<template>
  <form class="p-RegisterForm" @submit.prevent="register">
    <InputEmail v-model="email" :focus="true" @valid="onValidEmail" />

    <InputPassword v-model="password" @valid="onValidPassword" />


    <ButtonSolid class="p-RegisterForm-button" type="submit" label="Register" :disabled="disableSubmit" />
  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const email = ref('')
const password = ref('')

const emailValid = ref(false)
const passwordValid = ref(false)

const onValidEmail = (event) => {
  console.log("emailhandler", event)
  emailValid.value = event
}

const onValidPassword = (event) => {
  console.log("passwordhandler", event)
  passwordValid.value = event
}

const disableSubmit = computed(() => !emailValid.value || !passwordValid.value)


const register = () => {
  console.log('Credentials', emailValid.value, passwordValid.value)

}
</script>

<style scoped>
form {
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;
  display: flex;
}

.p-RegisterForm-button {
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}
</style>
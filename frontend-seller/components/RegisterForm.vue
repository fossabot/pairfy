<template>
  <form class="p-RegisterForm" @submit.prevent="register">
    <InputEmail class="p-RegisterForm-email" v-model="email" :focus="true" @valid="onValidEmail" />

    <InputPassword class="p-RegisterForm-password" v-model="password" @valid="onValidPassword" />


    <InputSelect class="p-RegisterForm-select" v-model="country" label="Country" :options="[
      { label: 'Colombia', code: 'CO' },
      { label: 'Argentina', code: 'AR' },
      { label: 'México', code: 'MX' }
    ]" :required="true" @valid="onValidCountry" />


    <InputCheck class="p-RegisterForm-terms" v-model="terms" @valid="onValidTerms" label="I have read the "
      :link="{ label: 'terms of use and privacy policy', href: '/terms' }" :required="true" />


    <ButtonSolid class="p-RegisterForm-button" type="submit" label="Register" :disabled="disableSubmit" />
  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const country = ref('')
const terms = ref(false)

const emailValid = ref(false)
const passwordValid = ref(false)
const countryValid = ref(false)
const termsValid = ref(false)

const onValidEmail = (event) => {
  console.log("emailhandler", event)
  emailValid.value = event
}

const onValidPassword = (event) => {
  console.log("passwordhandler", event)
  passwordValid.value = event
}

const onValidCountry = (event) => {
  console.log("countryHandler", event)
  countryValid.value = event
}

const onValidTerms = (event) => {
  console.log("termshandler", event)
  termsValid.value = event
}

const disableSubmit = computed(() => !emailValid.value || !passwordValid.value || !termsValid.value || !countryValid.value)


const register = async () => {
  try {
    console.log('Credentials', emailValid.value, passwordValid.value)

    await auth.register({ email: email.value, password: password.value, terms_accepted: true, country: 'US' })
  } catch (err) {
    console.error(err)
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

.p-RegisterForm-button {
  margin-bottom: 1rem;
}

.p-RegisterForm-terms {
  font-family: var(--text-size-0);
  color: var(--text-b);
  margin-bottom: 1rem;
}

.p-RegisterForm-email,
.p-RegisterForm-password,
.p-RegisterForm-select {
  margin-bottom: 1rem;
}
</style>
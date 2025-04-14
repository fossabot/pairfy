<template>
  <form class="p-RegisterForm" @submit.prevent="register">
    <ToastComp ref="toastRef" />

    <InputEmail class="p-RegisterForm-email" v-model="email" :focus="true" @valid="onValidEmail" />

    <InputAlphaNumeric class="p-RegisterForm-username" v-model="username" label="username" placeholder="Eg: Matthew777"
      :minLength="5" :maxLength="20" @valid="onValidUsername" />

    <InputPassword class="p-RegisterForm-password" v-model="password" @valid="onValidPassword" />


    <InputSelect class="p-RegisterForm-select" v-model="country" label="Country" :options="countries" :required="true"
      placeholder="Select Country..." @valid="onValidCountry" />

    <InputCheck class="p-RegisterForm-terms" v-model="terms" @valid="onValidTerms" label="I have read the "
      :link="{ label: 'terms of use and privacy policy.', href: '/terms' }" :required="true" />


    <ButtonSolid class="p-RegisterForm-button" type="submit" label="Register" :disabled="disableSubmit" />
  </form>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth'
import InputAlphaNumeric from './InputAlphaNumeric.vue'
const auth = useAuthStore()

const toastRef = ref(null);

const displayMessage = (message, type, duration) => {
  toastRef.value?.showToast(message, type, duration)
}

const countries = ref([{ label: 'United States', code: 'US' }])

const email = ref('')
const username = ref('')
const password = ref('')
const country = ref('')
const terms = ref(false)

const emailValid = ref(false)
const usernameValid = ref(false)
const passwordValid = ref(false)
const countryValid = ref(false)
const termsValid = ref(false)

const onValidEmail = (event) => {
  console.log("emailhandler", event)
  emailValid.value = event
}

const onValidUsername = (event) => {
  console.log("onValidUsername", event)
  usernameValid.value = event
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

const disableSubmit = computed(() => !emailValid.value || !usernameValid.value || !passwordValid.value || !termsValid.value || !countryValid.value)


const register = async () => {
  try {
    //console.log('Credentials', { email: email.value, username: username.value, password: password.value, terms_accepted: terms.value, country: country.value })

    const response = await auth.register({ email: email.value, username: username.value, password: password.value, terms_accepted: terms.value, country: country.value })

    displayMessage(response.data.message, 'info', 100_000)
  } catch (err) {
    console.error(err)
    displayMessage(err, 'error', 150_000)
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
.p-RegisterForm-username,
.p-RegisterForm-password,
.p-RegisterForm-select {
  margin-bottom: 1rem;
}
</style>
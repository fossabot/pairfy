<!-- pages/login.vue -->
<template>
  <div class="entry">
    <div class="entry-form">

      <div class="entry-form-image">
        <img :src="miImagen" alt="Mi imagen" />
      </div>


      <div class="entry-form-content">

        <component :is="currentComponent" />

        <div class="entry-form-switcher">

          <NuxtLink :to="{ path: '/entry', query: { m: 'login' } }">
            <button @click="mode = 'login'">I already have an account.</button>
          </NuxtLink>
          <NuxtLink :to="{ path: '/entry', query: { m: 'register' } }">
            <button @click="mode = 'register'">Create a new account.</button>
          </NuxtLink>
          <NuxtLink :to="{ path: '/entry', query: { m: 'recovery' } }">
            <button @click="mode = 'recovery'">Recover password.</button>
          </NuxtLink>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import miImagen from '@/assets/brand/icon.png'
import RegisterForm from '~/components/RegisterForm.vue'
import LoginForm from '~/components/LoginForm.vue'
import VerifyForm from '~/components/VerifyForm.vue'
import RecoveryForm from '~/components/RecoveryForm.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()


definePageMeta({
  layout: 'entry'
})

const mode = ref('login')


const views: any = {
  login: LoginForm,
  register: RegisterForm,
  recovery: RecoveryForm,
  verify: VerifyForm
} as const

const route = useRoute()


const currentView = computed(() => {
  const m = route.query.m?.toString() || 'login'
  return m in views ? m : 'login'
})


const currentComponent = computed(() => views[currentView.value])


onMounted(async () => {
  const mode = route.query.m?.toString()
  const token = route.query.t?.toString()

  if (mode === 'verify' && token) {
    await auth.verify({ token })
  }
})
</script>

<style scoped>
.entry {
  justify-content: center;
  align-items: flex-start;
  display: flex;
  height: 100%;
}

.entry-form {
  background: var(--background-a);
  border-radius: var(--radius-b);
  box-shadow: var(--shadow-a);
  margin-top: 4rem;
  padding: 1.5rem;
  width: 300px;
}

.entry-form-image {
  justify-content: center;
  display: flex;
  padding: 1rem;
}

.entry-form-image img {
  width: 8rem;
}

.entry-form-content {
  flex-direction: column;
  display: flex;
}

.entry-form-switcher {
  flex-direction: column;
  display: flex;
  align-items: flex-start;
}

.entry-form-switcher button {
  background: transparent;
  color: var(--primary-a);
  margin-bottom: 0.5rem;
  cursor: pointer;
  border: none;
}
</style>
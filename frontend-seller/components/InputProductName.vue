<template>
  <div class="p-InputProductName">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input ref="inputRef" v-model="internalValue" :id="props.id" type="text" @beforeinput="onBeforeInput" @drop.prevent
      :placeholder="placeholder" class="p-InputProductName-input" :class="{ 'is-invalid': errorMessage }"
      :maxlength="maxLength" :aria-invalid="!!errorMessage" :aria-describedby="`${props.id}-error`" inputmode="text" />
    <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
      {{ errorMessage || '-' }}
    </p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  id: { type: String, default: 'product-name' },
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Name' },
  placeholder: { type: String, default: 'Product name' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 200 },
  minLength: { type: Number, default: 3 }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'valid', value: boolean): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const errorMessage = ref('')
const internalValue = ref(props.modelValue)

const productNameRegex = /^[\p{L}\p{N} .,'"\-():+]+$/u

const messages = {
  required: 'This field is required.',
  minLength: `Minimum length is ${props.minLength} characters.`,
  maxLength: `Maximum length is ${props.maxLength} characters.`,
  invalid: 'Only valid characters are allowed: letters, numbers, basic punctuation.'
}

onMounted(() => {
  if (props.focus) inputRef.value?.focus()
})

watch(() => props.focus, (newVal) => {
  if (newVal) inputRef.value?.focus()
})


watch(() => props.modelValue, (val) => {
  if (val !== internalValue.value) internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
  validateInput(val)
})

const onBeforeInput = (e: Event) => {
  const inputEvent = e as InputEvent
  if (inputEvent.data && !productNameRegex.test(inputEvent.data)) {
    e.preventDefault()
  }
}


const validateInput = (value: string) => {
  const validators: { condition: boolean; message: string }[] = [
    { condition: props.required && !value.trim(), message: messages.required },
    { condition: value.length < props.minLength, message: messages.minLength },
    { condition: value.length > props.maxLength, message: messages.maxLength },
    { condition: !productNameRegex.test(value), message: messages.invalid },
  ]

  for (const { condition, message } of validators) {
    if (condition) {
      errorMessage.value = message
      emit('valid', false)
      return
    }
  }

  errorMessage.value = ''
  emit('valid', true)
}

</script>

<style scoped>
.p-InputProductName {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.p-InputProductName-input {
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 6px);
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.p-InputProductName-input:focus-within {
  border: 1px solid var(--primary-a, #2563eb);
}

.p-InputProductName-input.is-invalid {
  border-color: red;
}

.title-text {
  font-size: var(--text-size-1, 1rem);
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.error-text {
  animation: fadeIn 0.2s ease-in-out;
  font-size: var(--text-size-0, 0.875rem);
  margin-top: 0.5rem;
  color: transparent;
  opacity: 0; 
}

.error-text.visible {
  opacity: 1;
  color: red;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>

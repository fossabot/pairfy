<template>
  <div class="p-InputProductCity">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input
      ref="inputRef"
      v-model="internalValue"
      :id="props.id"
      type="text"
      @drop.prevent
      :placeholder="placeholder"
      class="p-InputProductCity-input"
      :class="{ 'is-invalid': errorMessage }"
      :maxlength="maxLength"
      :aria-invalid="!!errorMessage"
      :aria-describedby="`${props.id}-error`"
      inputmode="text"
      @blur="validateInput(internalValue)"
    />
    <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
      {{ errorMessage || '-' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: 'product-city' },
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'City' },
  placeholder: { type: String, default: 'e.g. Los Ángeles' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 40 },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'valid', payload: { valid: boolean, value: string | null }): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue)
const errorMessage = ref('')

const cityRegex = /^[\p{L}\p{M}\s\-'.(),]+$/u

const messages = {
  required: 'This field is required.',
  invalid: 'Only letters, spaces, and symbols like - . , ’ ( ) are allowed.',
  maxLength: `Maximum length is ${props.maxLength} characters.`,
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

const validateInput = (value: string) => {
  const validators = [
    { condition: props.required && value.trim() === '', message: messages.required },
    { condition: value.length > props.maxLength, message: messages.maxLength },
    { condition: value.trim() !== '' && !cityRegex.test(value), message: messages.invalid },
  ]

  for (const { condition, message } of validators) {
    if (condition) {
      errorMessage.value = message
      emit('valid', { valid: false, value: null })
      return
    }
  }

  errorMessage.value = ''
  emit('valid', { valid: true, value })
}
</script>

<style scoped>
.p-InputProductCity {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.p-InputProductCity-input {
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 6px);
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.p-InputProductCity-input:focus-within {
  border: 1px solid var(--primary-a, #2563eb);
}

.p-InputProductCity-input.is-invalid {
  border-color: red;
}

.title-text {
  margin-bottom: 0.75rem;
  font-weight: 600;
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
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

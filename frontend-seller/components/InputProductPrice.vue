<template>
  <div class="p-InputPrice">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input
      ref="inputRef"
      v-model="internalValue"
      :id="props.id"
      type="text"
      @beforeinput="onBeforeInput"
      @drop.prevent
      :placeholder="placeholder"
      class="p-InputPrice-input"
      :class="{ 'is-invalid': errorMessage }"
      :maxlength="maxLength"
      :aria-invalid="!!errorMessage"
      :aria-describedby="`${props.id}-error`"
      inputmode="numeric"
    />
    <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
      {{ errorMessage || '-' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: 'price' },
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Price (USD)' },
  placeholder: { type: String, default: '0' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 9 },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'valid', payload: { valid: boolean, value: number | null }): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue)
const errorMessage = ref('')

const dollarRegex = /^[0-9]*$/

const messages = {
  required: 'This field is required.',
  invalid: 'Only whole dollar amounts are allowed.',
  maxLength: `Maximum length is ${props.maxLength} digits.`,
  minValue: 'Minimum is $5.',
  maxValue: 'Maximum is $999,999.',
}

onMounted(() => {
  if (props.focus) inputRef.value?.focus()
  validateInput(internalValue.value)
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
  const target = e.target as HTMLInputElement
  internalValue.value = target.value.replace(/\D+/g, '')
}

const validateInput = (value: string) => {
  const numValue = Number(value)

  const validators: { condition: boolean; message: string }[] = [
    { condition: props.required && value.trim() === '', message: messages.required },
    { condition: value.length > props.maxLength, message: messages.maxLength },
    { condition: !dollarRegex.test(value), message: messages.invalid },
    { condition: numValue < 5, message: messages.minValue },
    { condition: numValue > 999999, message: messages.maxValue },
  ]

  for (const { condition, message } of validators) {
    if (condition) {
      errorMessage.value = message
      emit('valid', { valid: false, value: null })
      return
    }
  }

  errorMessage.value = ''
  emit('valid', { valid: true, value: numValue })
}
</script>

<style scoped>
.p-InputPrice {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.p-InputPrice-input {
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 6px);
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.p-InputPrice-input:focus-within {
  border: 1px solid var(--primary-a, #2563eb);
}

.p-InputPrice-input.is-invalid {
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

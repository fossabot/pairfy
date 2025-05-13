<template>
  <div class="p-InputSku">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input
      ref="inputRef"
      v-model="internalValue"
      :id="props.id"
      type="text"
      @drop.prevent
      :placeholder="placeholder"
      class="p-InputSku-input"
      :class="{ 'is-invalid': errorMessage }"
      :maxlength="maxLength"
      :aria-invalid="!!errorMessage"
      :aria-describedby="`${props.id}-error`"
      inputmode="text"
      @blur="validate"
    />
    <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
      {{ errorMessage || '-' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: 'sku' },
  modelValue: { type: [String, null], default: null },
  label: { type: String, default: 'SKU' },
  placeholder: { type: String, default: 'TV55-SAMSUNG-2025' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 20 },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'valid', payload: { valid: boolean, value: string | null }): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const errorMessage = ref('')

const internalValue = ref<string | null>(props.modelValue)

watch(() => props.modelValue, (val) => {
  if (val !== internalValue.value) internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
  validate()
})

watch(() => props.focus, (focus) => {
  if (focus) inputRef.value?.focus()
})

onMounted(() => {
  if (props.focus) inputRef.value?.focus()
  validate()
})

const messages = {
  required: 'This field is required.',
  invalid: 'Invalid format. Use only UPPERCASE letters, numbers, and dashes.',
  maxLength: `Maximum length is ${props.maxLength} characters.`,
}

const skuRegex = /^[A-Z0-9-]+$/

function validate() {
  const value = internalValue.value?.trim() || ''

  if (props.required && value === '') {
    return setInvalid(messages.required)
  }

  if (value.length > props.maxLength) {
    return setInvalid(messages.maxLength)
  }

  if (!skuRegex.test(value)) {
    return setInvalid(messages.invalid)
  }

  errorMessage.value = ''
  emit('valid', { valid: true, value: value || null })
}

function setInvalid(message: string) {
  errorMessage.value = message
  emit('valid', { valid: false, value: null })
}
</script>

<style scoped>
.p-InputSku {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.p-InputSku-input {
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 6px);
  transition: border-color 0.2s;
  padding: 0.75rem 1rem;
  outline: none;
}

.p-InputSku-input:focus-within {
  border: 1px solid var(--primary-a, #2563eb);
}

.p-InputSku-input.is-invalid {
  border-color: var(--border-a);
}

.title-text {
  margin-bottom: 0.75rem;
}

.error-text {
  animation: fadeIn 0.2s ease-in-out;
  font-size: var(--text-size-0, 0.875rem);
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

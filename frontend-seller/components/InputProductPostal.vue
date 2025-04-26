<template>
  <div class="p-InputProductPostal">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input
      ref="inputRef"
      v-model="internalValue"
      :id="props.id"
      type="text"
      @drop.prevent
      :placeholder="placeholder"
      class="p-InputProductPostal-input"
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
  id: { type: String, default: 'product-postal' },
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Postal Code' },
  placeholder: { type: String, default: 'e.g. 10001' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 12 },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'valid', value: boolean): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue)
const errorMessage = ref('')

const postalRegex = /^[\p{L}\p{N}\s\-]+$/u

const messages = {
  required: 'This field is required.',
  invalid: 'Only letters, numbers, spaces and hyphens are allowed.',
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
  if (props.required && value.trim() === '') {
    errorMessage.value = messages.required
    emit('valid', false)
    return
  }
  if (value.length > props.maxLength) {
    errorMessage.value = `Maximum length is ${props.maxLength} characters.`
    emit('valid', false)
    return
  }
  if (!postalRegex.test(value)) {
    errorMessage.value = messages.invalid
    emit('valid', false)
    return
  }

  errorMessage.value = ''
  emit('valid', true)
}
</script>

<style scoped>
.p-InputProductPostal {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.p-InputProductPostal-input {
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 6px);
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.p-InputProductPostal-input:focus {
  border-color: var(--primary-a, #2563eb);
}

.p-InputProductPostal-input.is-invalid {
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

<template>
  <div class="p-InputProductName">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input ref="inputRef" v-model="internalValue" :id="props.id" type="text" @drop.prevent :placeholder="placeholder"
      class="p-InputProductName-input" :class="{ 'is-invalid': errorMessage }" :maxlength="maxLength"
      :aria-invalid="!!errorMessage" :aria-describedby="`${props.id}-error`" inputmode="text" @blur="validate" />
    <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
      {{ errorMessage || '\u00A0' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: 'product-name' },
  modelValue: { type: [String, null], default: null },
  label: { type: String, default: 'Name' },
  placeholder: { type: String, default: 'Product name' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 200 },
  minLength: { type: Number, default: 3 },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'valid', payload: { valid: boolean, value: string | null }): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue ?? '')
const errorMessage = ref('')

const productNameRegex = /^[\p{L}\p{N} .,'"\-(/&|＆):+]+$/u

const messages = {
  required: 'This field is required.',
  minLength: `Minimum length is ${props.minLength} characters.`,
  maxLength: `Maximum length is ${props.maxLength} characters.`,
  invalid: 'Only valid characters are allowed: letters, numbers, basic punctuation.',
}

onMounted(() => {
  if (props.focus) inputRef.value?.focus()
  validate()
})

watch(() => props.focus, (newVal) => {
  if (newVal) inputRef.value?.focus()
})

watch(() => props.modelValue, (val) => {
  const normalized = val ?? ''
  if (normalized !== internalValue.value) internalValue.value = normalized
})

watch(internalValue, () => {
  emitNormalizedValue()
  validate()
})

function emitNormalizedValue() {
  const normalized = internalValue.value.trim()
  emit('update:modelValue', normalized === '' ? null : normalized)
}

function validate() {
  const value = internalValue.value.trim()

  const rules = [
    { invalid: props.required && !value, message: messages.required },
    { invalid: value.length < props.minLength, message: messages.minLength },
    { invalid: value.length > props.maxLength, message: messages.maxLength },
    { invalid: !!value && !productNameRegex.test(value), message: messages.invalid },
  ]

  const failed = rules.find(rule => rule.invalid)
  if (failed) {
    errorMessage.value = failed.message
    emit('valid', { valid: false, value: null })
  } else {
    errorMessage.value = ''
    emit('valid', { valid: true, value: value || null })
  }
}
</script>


<style scoped>
.p-InputProductName {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.p-InputProductName-input {
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 6px);
  transition: border-color 0.2s;
  padding: 0.75rem 1rem;
  outline: none;
}

.p-InputProductName-input:focus-within {
  border-color: var(--primary-a, #2563eb);
}

.p-InputProductName-input.is-invalid {
  border-color: var(--border-a)
}

.title-text {
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.error-text {
  font-size: var(--text-size-0, 0.875rem);
  animation: fadeIn 0.2s ease-in-out;
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

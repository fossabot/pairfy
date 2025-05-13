<template>
  <div class="p-InputProductBrand">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input
      ref="inputRef"
      v-model="internalValue"
      :id="props.id"
      type="text"
      @beforeinput="onBeforeInput"
      @drop.prevent
      :placeholder="placeholder"
      class="p-InputProductBrand-input"
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
  id: { type: String, default: 'product-brand' },
  modelValue: { type: [String, null], default: '' },
  label: { type: String, default: 'Brand' },
  placeholder: { type: String, default: 'e.g. Samsung' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 40 },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'valid', payload: { valid: boolean, value: string | null }): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref<string | null>(props.modelValue)
const errorMessage = ref('')

const brandRegex = /^[\p{L}\p{N}\s\-.,&()']+$/u

const messages = {
  required: 'This field is required.',
  invalid: 'Only letters, numbers, spaces, and basic symbols like - . , & ( ) are allowed.',
  maxLength: `Maximum length is ${props.maxLength} characters.`,
}

const validate = () => {
  const value = internalValue.value?.trim() ?? ''

  if (value === '' && props.required) {
    errorMessage.value = messages.required
    emit('valid', { valid: false, value: null })
  } else {
    errorMessage.value = ''

    const validationResult = [
      { condition: value.length > props.maxLength, message: messages.maxLength },
      { condition: !brandRegex.test(value), message: messages.invalid },
    ].find(validator => validator.condition)

    if (validationResult) {
      errorMessage.value = validationResult.message
      emit('valid', { valid: false, value: null })
    } else {
      emit('valid', { valid: true, value: value || null })
    }
  }
}

onMounted(() => {
  if (props.focus) inputRef.value?.focus()
  validate()
})

watch(() => props.focus, (newVal) => {
  if (newVal) inputRef.value?.focus()
})

watch(() => props.modelValue, (val) => {
  if (val !== internalValue.value) internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
  validate()
})

const onBeforeInput = (e: Event) => {
  const inputEvent = e as InputEvent
  if (inputEvent.inputType === 'insertFromPaste' || !inputEvent.data) return
}
</script>

<style scoped>
.p-InputProductBrand {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.p-InputProductBrand-input {
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 6px);
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.p-InputProductBrand-input:focus-within {
  border: 1px solid var(--primary-a, #2563eb);
}

.p-InputProductBrand-input.is-invalid {
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

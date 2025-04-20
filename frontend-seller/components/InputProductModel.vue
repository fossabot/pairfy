<template>
    <div class="p-InputProductModel">
      <label :for="props.id" class="title-text">{{ label }}</label>
      <input
        ref="inputRef"
        v-model="internalValue"
        :id="props.id"
        type="text"
        @beforeinput="onBeforeInput"
        @drop.prevent
        :placeholder="placeholder"
        class="p-InputProductModel-input"
        :class="{ 'is-invalid': errorMessage }"
        :maxlength="maxLength"
        :aria-invalid="!!errorMessage"
        :aria-describedby="`${props.id}-error`"
        inputmode="text"
      />
      <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
        {{ errorMessage || '-' }}
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    id: { type: String, default: 'product-model' },
    modelValue: { type: String, default: '' },
    label: { type: String, default: 'Model' },
    placeholder: { type: String, default: 'e.g. XR-3000' },
    focus: { type: Boolean, default: false },
    required: { type: Boolean, default: true },
    maxLength: { type: Number, default: 40 },
  })
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'valid', value: boolean): void
  }>()
  
  const inputRef = ref<HTMLInputElement | null>(null)
  const internalValue = ref(props.modelValue)
  const errorMessage = ref('')
  
  // Allows only letters, numbers, dashes and spaces
  const modelRegex = /^[a-zA-Z0-9\- ]*$/
  
  const messages = {
    required: 'This field is required.',
    invalid: 'Only letters, numbers, dashes, and spaces are allowed.',
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
  
  const onBeforeInput = (e: Event) => {
    const inputEvent = e as InputEvent
    if (inputEvent.data && !/^[a-zA-Z0-9\- ]$/.test(inputEvent.data)) {
      e.preventDefault()
    }
  }
  
  const validateInput = (value: string) => {
    const validators: { condition: boolean; message: string }[] = [
      { condition: props.required && value.trim() === '', message: messages.required },
      { condition: value.length > props.maxLength, message: messages.maxLength },
      { condition: !modelRegex.test(value), message: messages.invalid },
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
  .p-InputProductModel {
    flex-direction: column;
    display: flex;
    width: 100%;
  }
  
  .p-InputProductModel-input {
    border: 1px solid var(--border-a, #ccc);
    border-radius: var(--input-radius, 6px);
    padding: 0.75rem 1rem;
    outline: none;
    transition: border-color 0.2s;
  }
  
  .p-InputProductModel-input:focus-within {
    border: 1px solid var(--primary-a, #2563eb);
  }
  
  .p-InputProductModel-input.is-invalid {
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
  
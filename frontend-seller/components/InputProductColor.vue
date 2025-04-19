<template>
    <div class="p-InputProductColor">
      <label :for="props.id" class="title-text">{{ label }}</label>
      <div class="color-picker-wrapper" :class="{ 'is-invalid': errorMessage }">
        <input
          ref="inputRef"
          v-model="internalValue"
          :id="props.id"
          type="color"
          class="color-picker"
          @input="onInput"
          :aria-describedby="`${props.id}-error`"
          :aria-invalid="!!errorMessage"
        />
        <span class="color-value">{{ internalValue }}</span>
      </div>
      <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
        {{ errorMessage || '-' }}
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    id: { type: String, default: 'product-color' },
    modelValue: { type: String, default: '#000000' },
    label: { type: String, default: 'Color' },
    required: { type: Boolean, default: true },
  })
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'valid', value: boolean): void
  }>()
  
  const internalValue = ref(props.modelValue)
  const errorMessage = ref('')
  const inputRef = ref<HTMLInputElement | null>(null)
  
  watch(() => props.modelValue, (val) => {
    if (val !== internalValue.value) internalValue.value = val
  })
  
  watch(internalValue, (val) => {
    emit('update:modelValue', val)
    validate(val)
  })
  
  onMounted(() => {
    validate(internalValue.value)
  })
  
  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    internalValue.value = target.value
  }
  
  const validate = (val: string) => {
    const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(val)
    if (props.required && !isValidHex) {
      errorMessage.value = 'Please select a valid hex color.'
      emit('valid', false)
    } else {
      errorMessage.value = ''
      emit('valid', true)
    }
  }
  </script>
  
  <style scoped>
  .p-InputProductColor {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .color-picker-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
  }
  
  .color-picker {
    border: 1px solid var(--border-a, #ccc);
    border-radius: 6px;
    width: 3rem;
    height: 2.25rem;
    padding: 0;
    background: none;
    cursor: pointer;
  }
  
  .color-value {
    font-family: monospace;
    font-size: 0.875rem;
  }
  
  .color-picker-wrapper.is-invalid .color-picker {
    border-color: red;
  }
  
  .title-text {
    font-size: var(--text-size-1, 1rem);
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
    from { opacity: 0 }
    to { opacity: 1 }
  }
  </style>
  
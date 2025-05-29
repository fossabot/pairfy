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
        @input="(e) => validate((e.target as HTMLInputElement).value)"
        :aria-describedby="`${props.id}-error`"
        :aria-invalid="!!errorMessage"
      />
      <span class="color-value">{{ internalValue }}</span>
    </div>
    <p
      class="error-text"
      :class="{ visible: errorMessage }"
      :id="`${props.id}-error`"
      aria-live="polite"
    >
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
  (e: 'valid', value: { valid: boolean; value: string | null }): void
}>()

const internalValue = ref(props.modelValue)
const errorMessage = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.modelValue, (val) => {
  if (val !== internalValue.value) internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

onMounted(() => {
  validate(internalValue.value)
})

const validate = (val: string) => {
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(val)
  if (props.required && !isValidHex) {
    errorMessage.value = 'Please select a valid hex color.'
    emit('valid', { valid: false, value: null })
  } else {
    errorMessage.value = ''
    emit('valid', { valid: true, value: val })
  }
}
</script>

<style scoped>
.p-InputProductColor {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.color-picker-wrapper {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.color-picker {
  border: 1px solid var(--border-a);
  border-radius: var(--radius-b);
  background: none;
  cursor: pointer;
  height: 2rem;
}

.color-value {
  font-size: var(--text-size-1);
  color: var(--text-a);
}

.color-picker-wrapper.is-invalid .color-picker {
  border-color: red;
}

.title-text {
  margin-bottom: 0.75rem;
}

.error-text {
  animation: fadeIn 0.2s ease-in-out;
  font-size: var(--text-size-0, 0.875rem);
  margin: 0.5rem 0;
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

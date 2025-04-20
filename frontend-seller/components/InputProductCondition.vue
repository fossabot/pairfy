<template>
  <div class="p-InputProductCondition">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <div class="switch-group" :class="{ 'is-invalid': errorMessage }" role="radiogroup" :aria-describedby="`${props.id}-error`">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        class="switch-button"
        :class="{ active: internalValue === option }"
        @click="selectOption(option)"
        :aria-pressed="internalValue === option"
      >
        {{ capitalize(option) }}
      </button>
    </div>
    <p class="error-text" :class="{ visible: errorMessage }" :id="`${props.id}-error`">
      {{ errorMessage || '-' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: 'product-condition' },
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Condition' },
  required: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'valid', value: boolean): void
}>()

const options = ['new', 'used', 'refurbished'] as const
const internalValue = ref(props.modelValue)
const errorMessage = ref('')

watch(() => props.modelValue, (val) => {
  if (val !== internalValue.value) internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
  validate(val)
})


const selectOption = (val: string) => {
  internalValue.value = val
}

const messages = {
  required: 'Please select a condition.',
}

const validate = (val: string) => {
  if (props.required && !val) {
    errorMessage.value = messages.required
    emit('valid', false)
  } else {
    errorMessage.value = ''
    emit('valid', true)
  }
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<style scoped>
.p-InputProductCondition {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.switch-group {
  display: flex;
  gap: 0.5rem;
}

.switch-button {
  border: 1px solid var(--border-a, #ccc);
  background: var(--background-a);
  border-radius: var(--radius-b);
  font-size: var(--text-size-0);
  padding: 0.75rem 1rem;
  font-weight: 500;
  transition: 0.2s;
  cursor: pointer;
  flex: 1;
}

.switch-button.active {
  background-color: var(--primary-a);
  border-color: var(--primary-a);
  color: var(--text-w);
}

.switch-group.is-invalid .switch-button {
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

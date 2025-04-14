<template>
  <div class="p-InputSelect">
    <label class="title-text">{{ label }}</label>
    <select
      ref="selectRef"
      :value="modelValue"
      @change="onChange"
      class="p-InputSelect-select"
      :class="{ 'is-invalid': errorMessage }"
    >
      <option disabled value="" class="placeholder-option">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.code"
        :value="option.code"
      >
        {{ option.label }}
      </option>
    </select>

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: { type: Array, required: true }, // Expected: [{ label, code }]
  placeholder: { type: String, default: 'Select one...' }, // ✅ NUEVA PROP
  focus: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'valid'])

const selectRef = ref(null)
const errorMessage = ref('')

const validate = (value) => {
  if (props.required && !value) {
    errorMessage.value = 'This field is required.'
    emit('valid', false)
    return false
  }
  errorMessage.value = ''
  emit('valid', true)
  return true
}

const onChange = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  validate(value)
}

onMounted(() => {
  if (props.focus) {
    selectRef.value?.focus()
  }
  validate(props.modelValue)
})
</script>

<style scoped>
.p-InputSelect {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}

.p-InputSelect-select {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-size: var(--text-size-0);
  background: var(--background-a);
  border: 1px solid var(--border-a);
  border-radius: var(--input-radius);
  padding: 0.75rem 1rem;
  color: var(--text-b);
  appearance: none;
  cursor: pointer;
  outline: none;
  width: 100%;
}

.p-InputSelect-select:focus {
  border-color: var(--primary-a);
}

.p-InputSelect-select.is-invalid {
  border-color: red;
}

.placeholder-option {
  color: var(--text-b);
}

.title-text {
  font-size: var(--text-size-1);
  margin-bottom: 0.75rem;
  font-weight: bold;
}

.error-text {
  font-size: var(--text-size-0);
  animation: fadeIn 0.2s ease-in-out;
  margin-top: 0.5rem;
  color: red;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

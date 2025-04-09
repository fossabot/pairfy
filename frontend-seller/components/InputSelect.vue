<template>
  <div class="p-InputSelect">
    <label class="title-text">{{ label }}</label>
    <select ref="selectRef" :value="modelValue" @change="onChange" :class="[
      modelValue === '' ? 'placeholder-option' : '',
      'p-InputSelect-select',
      { 'is-invalid': errorMessage }
    ]">
      <option disabled value="">Select one...</option>
      <option v-for="option in options" :key="option.code" :value="option.code">
        {{ option.label }}
      </option>
    </select>


    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    required: true
    // Expected: [{ label: string, code: string }]
  },
  focus: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'valid'])

const selectRef = ref(null)
const errorMessage = ref('')

const validate = (value) => {
  if (props.required && !value) {
    errorMessage.value = ''
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
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-a, #ccc);
  border-radius: var(--input-radius, 8px);
  outline: none;
  appearance: none;
  background-color: white;
}

.p-InputSelect-select.is-invalid {
  border-color: red;
}

.title-text {
  font-size: var(--text-size-1);
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.error-text {
  font-size: var(--text-size-0, 12px);
  animation: fadeIn 0.2s ease-in-out;
  margin-top: 0.5rem;
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
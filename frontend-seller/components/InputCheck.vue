<template>
  <div class="p-InputCheck">
    <label class="checkbox-wrapper">
      <input ref="checkboxRef" type="checkbox" :checked="modelValue" @change="onChange" class="checkbox-input" />
      <span class="checkbox-box"></span>
      <span class="checkbox-label">{{ label }}

        <a class="checkbox-link" v-if="link" :href="link.href" target="_blank" rel="noopener">
          {{ link.label }}
        </a>

      </span>
    </label>

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  focus: {
    type: Boolean,
    default: false
  },
  link: {
    type: Object,
    default: null
    // expected: { label: string, href: string }
  }
})

const emit = defineEmits(['update:modelValue', 'valid'])

const checkboxRef = ref(null)
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
  const checked = event.target.checked
  emit('update:modelValue', checked)
  validate(checked)
}

onMounted(() => {
  if (props.focus) {
    checkboxRef.value?.focus()
  }

  // validar inicial
  validate(props.modelValue)
})


</script>

<style scoped>
.p-InputCheck {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  display: none;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-a, #ccc);
  border-radius: 4px;
  position: relative;
  background-color: white;
}

.checkbox-input:checked+.checkbox-box {
  background-color: var(--primary-a, #3498db);
  border-color: var(--primary-a, #3498db);
}

.checkbox-input:checked+.checkbox-box::after {
  content: '✓';
  position: absolute;
  top: -1px;
  left: 4px;
  font-size: 16px;
  color: white;
}

.checkbox-label {
  font-size: var(--text-size-0);
}

.error-text {
  color: red;
  font-size: var(--text-size-0);
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.checkbox-link {
  text-decoration: underline;
  color: var(--text-a);
  font-size: inherit;
  font-weight: 500;
}
</style>
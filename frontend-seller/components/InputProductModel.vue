<template>
  <div class="p-InputProductModel">
    <label :for="props.id" class="title-text">{{ label }}</label>
    <input
      ref="inputRef"
      v-model="internalValue"
      :id="props.id"
      type="text"
      @drop.prevent
      :placeholder="placeholder"
      class="p-InputProductModel-input"
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
import { ref, watch, computed, onMounted } from 'vue';

const props = defineProps({
  id: { type: String, default: 'product-model' },
  modelValue: { type: [String, null], default: null },
  label: { type: String, default: 'Model' },
  placeholder: { type: String, default: 'e.g. XR-6400a' },
  focus: { type: Boolean, default: false },
  required: { type: Boolean, default: true },
  maxLength: { type: Number, default: 40 },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
  (e: 'valid', payload: { valid: boolean; value: string | null }): void;
}>();


const inputRef = ref<HTMLInputElement | null>(null);

const internalValue = ref<string | null>(props.modelValue);

const errorMessage = ref('');

const modelRegex = /^[a-zA-Z0-9\- ]*$/;

const messages = {
  required: '*',
  invalid: 'Only letters, numbers, dashes, and spaces are allowed.',
  maxLength: `Maximum length is ${props.maxLength} characters.`,
};


const isValueEmpty = computed(() => !internalValue.value || internalValue.value.trim() === '');


const validate = () => {
  const value = internalValue.value?.trim() ?? '';
  errorMessage.value = '';

  if (props.required && isValueEmpty.value) {
    errorMessage.value = messages.required;
    emit('valid', { valid: false, value: null });
  } else if (value.length > props.maxLength) {
    errorMessage.value = messages.maxLength;
    emit('valid', { valid: false, value: null });
  } else if (value && !modelRegex.test(value)) {
    errorMessage.value = messages.invalid;
    emit('valid', { valid: false, value: null });
  } else {
    emit('valid', { valid: true, value: value || null });
  }
};

onMounted(() => {
  if (props.focus) inputRef.value?.focus();
  validate();
});

watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal;
  validate();
});

watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal);
  validate();
});
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
  transition: var(--transition-a);
  padding: 0.75rem 1rem;
  outline: none;
}

.p-InputProductModel-input:focus-within {
  border: 1px solid var(--primary-a, #2563eb);
}

input:focus::placeholder {
  color: transparent;
}

input:hover {
  border: 1px solid var(--primary-a);
}

input:focus-within {
  border: 1px solid var(--primary-a);
}

.title-text {
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

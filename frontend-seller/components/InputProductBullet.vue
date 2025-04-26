<template>
  <div class="p-EditableBulletList">
    <label class="title-text">{{ label }}</label>

    <div class="list-container">
      <div v-for="(item, index) in items" :key="index" class="item">
        <textarea
          v-model="items[index]"
          placeholder="•"
          :maxlength="maxLength"
          class="textarea"
          :class="{ 'is-invalid': touched[index] && errors[index] }"
          :aria-invalid="touched[index] && errors[index]"
          @input="onInput(index)"
          @blur="onBlur(index)"
        />
        <p v-if="touched[index] && errors[index]" class="error-text">{{ errorMessage }}</p>
      </div>
    </div>

    <p v-if="touchedAny && globalError" class="error-text">
      At least one valid item is required.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => Array(4).fill(''),
  },
  label: {
    type: String,
    default: 'List of important features',
  },
  maxLength: {
    type: Number,
    default: 240,
  },
})

const emit = defineEmits(['update:modelValue', 'valid'])

const bulletRegex = /^[\w\s.,'-]{1,240}$/u
const errorMessage = 'Only letters, numbers, spaces, and basic punctuation (.,\'-) are allowed.'

const items = ref([...props.modelValue])
const touched = ref<boolean[]>(items.value.map(() => false))
const errors = ref<boolean[]>(items.value.map(() => false))
const touchedAny = ref(false)

const globalError = computed(() => {
  return items.value.every((item, idx) => !item.trim() || errors.value[idx])
})

function validateAll(currentItems: string[]) {
  currentItems.forEach((item, idx) => {
    const value = item.trim()
    errors.value[idx] = value !== '' && !bulletRegex.test(value)
  })
}

function emitValidEvent(currentItems: string[]) {
  const hasRegexError = errors.value.some(error => error)

  if (hasRegexError || currentItems.every((item, idx) => !item.trim() || errors.value[idx])) {
    emit('valid', { valid: false, value: null })
  } else {
    emit('valid', { valid: true, value: currentItems })
  }
}

function onInput(index: number) {
  const newItems = [...items.value] // ✅ hacer nueva copia segura
  validateAll(newItems)
  items.value = newItems             // ✅ volver a setear la copia para que Vue reaccione bien

  emit('update:modelValue', newItems)
  emitValidEvent(newItems)
}

function onBlur(index: number) {
  if (!touched.value[index]) {
    touched.value[index] = true
    touchedAny.value = true
  }
}
</script>

<style scoped>
.p-EditableBulletList {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.title-text {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.textarea {
  width: 100%;
  height: 3rem;
  max-height: 8rem;
  resize: vertical;
  line-height: 1.5;
  font-family: inherit;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border: 1px solid var(--border-a);
  border-radius: var(--input-radius);
  outline: none;
}

.textarea:focus-within {
  border: 1px solid var(--primary-a);
}

.textarea::-webkit-scrollbar {
  width: 0.9rem;
}

.textarea::-webkit-scrollbar-track {
  background: transparent;
}

.textarea::-webkit-scrollbar-thumb {
  border: 2px solid var(--background-b);
  background: #888;
  border-radius: 4px;
  cursor: pointer;
}

.textarea::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.textarea.is-invalid {
  border-color: red;
}

.error-text {
  font-size: var(--text-size-0);
  margin-top: 0.25rem;
  color: red;
}
</style>

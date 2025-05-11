<template>
  <div class="p-EditableBulletList">
    <label class="title-text">{{ label }}</label>

    <div class="list-container">
      <div v-for="(item, index) in items" :key="index" class="item">
        <textarea
          :value="item"
          placeholder="•"
          :maxlength="maxLength"
          class="textarea"
          :class="{ 'is-invalid': showError[index] }"
          :aria-invalid="showError[index]"
          @focus="markTouched(index)"
          @input="(e) => handleInput(index, e)"
        />
      </div>
    </div>

    <p class="error-text" :class="{ visible: overallErrorMessage !== '' }">
      {{ overallErrorMessage || '‎' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

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

const bulletRegex = /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}]{1,240}$/u

const items = ref<string[]>([...props.modelValue])
const touched = ref<boolean[]>(items.value.map(() => false))
const showError = ref<boolean[]>(items.value.map(() => false))

watch(() => props.modelValue, (newValue) => {
  items.value = [...newValue]
  resetValidationState()
  validateAll()
})

function resetValidationState() {
  touched.value = items.value.map(() => false)
  showError.value = items.value.map(() => false)
}

const overallErrorMessage = computed(() => {
  const hasValid = items.value.some(isValidItem)
  const hasInvalid = items.value.some((val) => val.trim() !== '' && !isValidItem(val))
  if (!hasValid) return 'At least one valid feature is required.'
  if (hasInvalid) return 'Some features contain invalid characters.'
  return ''
})

function isValidItem(text: string): boolean {
  const trimmed = text.trim()
  return trimmed !== '' && bulletRegex.test(trimmed)
}

function markTouched(index: number) {
  touched.value[index] = true
}

function handleInput(index: number, event: Event) {
  const el = event.target as HTMLTextAreaElement
  const value = el.value
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'

  items.value[index] = value
  validateItem(index)

  emit('update:modelValue', [...items.value])
  emitValidation()
}

function validateItem(index: number) {
  showError.value[index] = touched.value[index] && !isValidItem(items.value[index])
}

function validateAll() {
  items.value.forEach((_, idx) => validateItem(idx))
  emitValidation()
}

function emitValidation() {
  const valid = items.value.some(isValidItem) &&
    items.value.every((val) => val.trim() === '' || isValidItem(val))
  emit('valid', { valid, value: valid ? [...items.value] : null })
}

onMounted(() => {
  validateAll()
})
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
  height: 43px;
  max-height: 12rem;
  resize: none; 
  overflow-y: hidden;
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
  min-height: 1.2rem; 
  visibility: hidden;
  margin-top: 1rem;
  text-align: left;
  color: red;
}

.error-text.visible {
  visibility: visible;
}
</style>

<template>
  <div class="p-EditableBulletList">
    <label class="title-text">{{ label }}</label>

    <div class="list-container">
      <div v-for="(item, index) in items" :key="index" class="item">
        <textarea
          v-model="items[index]"
          ref="textareas"
          placeholder="•"
          :maxlength="maxLength"
          class="textarea"
          :class="{ 'is-invalid': showError[index] }"
          :aria-invalid="showError[index]"
          @focus="onFocus(index)"
          @input="(e) => onInput(index, e)"
        />
        <p class="error-text" :class="{ visible: showError[index] }">
          {{ showError[index] ? errorMessages[index] : '‎' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const items = ref([...props.modelValue])
const touched = ref<boolean[]>(items.value.map(() => false))
const showError = ref<boolean[]>(items.value.map(() => false))
const errorMessages = ref<string[]>(items.value.map(() => ''))

function onFocus(index: number) {
  if (!touched.value[index]) {
    touched.value[index] = true
    validateItem(index)
  }
}

function onInput(index: number, event: Event) {
  const textarea = event.target as HTMLTextAreaElement


  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'

  validateItem(index)

  emit('update:modelValue', items.value)
  emitValidEvent()
}

function validateItem(index: number) {
  const item = items.value[index].trim()

  if (item === '') {
    showError.value[index] = true
    errorMessages.value[index] = 'This field is required.'
  } else if (!bulletRegex.test(item)) {
    showError.value[index] = true
    errorMessages.value[index] = 'Invalid characters.'
  } else {
    showError.value[index] = false
    errorMessages.value[index] = ''
  }
}

function emitValidEvent() {
  const hasErrors = showError.value.some(err => err)

  if (hasErrors) {
    emit('valid', { valid: false, value: null })
  } else {
    emit('valid', { valid: true, value: [...items.value] })
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
  margin-top: 0.25rem;
  min-height: 1.2rem; 
  visibility: hidden;
  color: red;
}

.error-text.visible {
  visibility: visible;
}
</style>

<template>
  <div class="p-InputSelect" @click="toggleDropdown" ref="dropdownRef">
    <label :for="props.id" class="title-text">{{ label }}</label>

    <div class="dropdown-display" :class="{ 'is-invalid': errorMessage }">
  <template v-if="selectedOption">
    <slot name="option" :option="selectedOption">
      <!-- fallback si no hay slot externo -->
      <span class="flex items-center gap-2">
        <img :src="`/flags/${selectedOption.code}.svg`" class="flag-icon" />
        {{ selectedOption.label }}
      </span>
    </slot>
  </template>
  <template v-else>
    <span class="placeholder">{{ placeholder }}</span>
  </template>
</div>


    <ul v-if="isOpen" class="dropdown-list">
      <li
        v-for="option in options"
        :key="option.code"
        class="dropdown-item"
        @click.stop="select(option)"
      >
        <slot name="option" :option="option">
          {{ option.label }}
        </slot>
      </li>
    </ul>

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  id: { type: String, default: 'input-select' },
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Select one...' },
  focus: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'valid'])

const isOpen = ref(false)
const dropdownRef = ref(null)
const errorMessage = ref('')

const selectedOption = computed(() =>
  props.options.find(opt => opt.code === props.modelValue)
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function select(option) {
  emit('update:modelValue', option.code)
  validate(option.code)
  isOpen.value = false
}

function validate(value) {
  if (props.required && !value) {
    errorMessage.value = 'This field is required.'
    emit('valid', false)
    return false
  }
  errorMessage.value = ''
  emit('valid', true)
  return true
}

function handleClickOutside(e) {
  if (!dropdownRef.value?.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.p-InputSelect {
  font-size: var(--text-size-0);
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.dropdown-display {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-a);
  border-radius: var(--input-radius);
  background: var(--background-a);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-display.is-invalid {
  border-color: red;
}

.placeholder {
  font-size: var(--text-size-0);
    text-rendering: auto;
    color: var(--text-b);
    letter-spacing: normal;
    font-weight: 400;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
}

.dropdown-list {
  font-size: var(--text-size-0);
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--background-a);
  border: 1px solid var(--border-a);
  border-radius: var(--input-radius);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 0;
  margin: 0;
  list-style: none;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f9f9f9;
}

.title-text {
  font-size: var(--text-size-1);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.error-text {
  font-size: var(--text-size-0);
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

<template>
  <div class="p-InputSelect" ref="dropdownRef">
    <label :for="props.id" class="title-text">{{ label }}</label>

    <!-- Display -->
    <div
      class="dropdown-display"
      :class="{ 'is-invalid': errorMessage }"
      role="combobox"
      :aria-expanded="isOpen.toString()"
      aria-haspopup="listbox"
      :aria-controls="`${props.id}-listbox`"
      @click="toggleDropdown"
    >
      <template v-if="selectedOption">
        <slot name="option" :option="selectedOption">
          <span class="flex items-center gap-2">
            <img
              :src="`/flags/${selectedOption.code}.svg`"
              @error="onFlagError"
              class="flag-icon"
              alt=""
              aria-hidden="true"
            />
            {{ selectedOption.label }}
          </span>
        </slot>
      </template>
      <template v-else>
        <span class="placeholder">{{ placeholder }}</span>
      </template>

      <!-- Down arrow icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="chevron-down-icon"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>

    <!-- Dropdown -->
    <ul
      v-if="isOpen"
      :id="`${props.id}-listbox`"
      class="dropdown-list"
      role="listbox"
    >
      <li
        v-for="option in options"
        :key="option.code"
        class="dropdown-item"
        @click.stop="select(option)"
        :id="`option-${option.code}`"
        role="option"
      >
        <slot name="option" :option="option">
          <span class="flex items-center gap-2">
            <img
              :src="`/flags/${option.code}.svg`"
              @error="onFlagError"
              class="flag-icon"
              alt=""
              aria-hidden="true"
            />
            {{ option.label }}
          </span>
        </slot>
      </li>
    </ul>

    <!-- Error -->
    <p
      class="error-text"
      :class="{ visible: errorMessage }"
      :id="`${props.id}-error`"
    >
      {{ errorMessage || '-' }}
    </p>
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

function onFlagError(event) {
  event.target.src = '/flags/default.svg'
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
  justify-content: space-between;
}

.dropdown-display.is-invalid {
  border-color: red;
}

.chevron-down-icon {
  margin-left: auto;
  flex-shrink: 0;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.dropdown-display[aria-expanded="true"] .chevron-down-icon {
  transform: rotate(180deg);
}

.placeholder {
  color: var(--text-b);
  font-style: italic;
}

.dropdown-list {
  border-radius: var(--input-radius);
  border: 1px solid var(--border-a);
  background: var(--background-a);
  font-size: var(--text-size-0);
  box-shadow: var(--shadow-a);
  position: absolute;
  top: calc(100% - 30px);
  left: 0;
  right: 0;
  max-height: 150px;
  list-style: none;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
  margin: 0;
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

.flag-icon {
  width: 20px;
  height: 14px;
  object-fit: contain;
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

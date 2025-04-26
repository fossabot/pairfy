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
          :class="{ 'is-invalid': touched && showError && !item.trim() }"
          :aria-invalid="touched && showError && !item.trim()"
          @blur="onBlur"
        />
      </div>
    </div>
    <p v-if="touched && showError" class="error-text">At least one item is required.</p>
  </div>
</template>

<script setup lang="ts">
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

const items = ref([...props.modelValue])
const touched = ref(false)

const showError = computed(() => items.value.filter(item => item.trim()).length === 0)

watch(items, () => {
  emit('update:modelValue', items.value)

  if (showError.value) {
    emit('valid', { valid: false, value: null })
  } else {
    emit('valid', { valid: true, value: items.value })
  }
}, { deep: true })

function onBlur() {
  touched.value = true
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
  margin-top: 0.5rem;
  color: red;
}
</style>

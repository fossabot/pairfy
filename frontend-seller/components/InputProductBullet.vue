<template>
  <div class="p-EditableBulletList">
    <label class="title-text">{{ label }}</label>
    <div class="list-container">
      <div v-for="(item, index) in items" :key="index" class="item">
        <textarea v-model="items[index]" :placeholder="`Features ${index + 1}`" :maxlength="maxLength" class="textarea"
          :class="{ 'is-invalid': showError && !item.trim() }" />

      </div>
    </div>
    <p v-if="showError" class="error-text">At least one item is required.</p>
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

const emit = defineEmits(['update:modelValue'])

const items = ref([...props.modelValue])
const showError = computed(() => items.value.every(item => !item.trim()))

watch(items, () => {
  emit('update:modelValue', items.value)
}, { deep: true })
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
  resize: vertical;
  line-height: 1.5;
  font-family: inherit;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border: 1px solid var(--border-a);
  border-radius: var(--input-radius);
  outline: none;
  min-height: 2rem;
  max-height: 8rem;
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

<template>
  <div class="p-EditableBulletList">
    <label class="title-text">{{ label }}</label>
    <ul class="bullet-list">
      <li v-for="(item, index) in items" :key="index" class="bullet-item">
        <textarea
          v-model="items[index]"
          :placeholder="`Punto ${index + 1}`"
          :maxlength="maxLength"
          rows="2"
          class="bullet-textarea"
          :class="{ 'is-invalid': showError && !item.trim() }"
        />
        <small class="char-count">{{ item.length }} / {{ maxLength }}</small>
      </li>
    </ul>
    <p v-if="showError" class="error-text">Debes ingresar al menos un punto.</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => Array(5).fill(''),
  },
  label: {
    type: String,
    default: 'Technical specifications',
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
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.title-text {
  font-weight: 600;
  font-size: 1rem;
}

.bullet-list {
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.bullet-item {
  position: relative;
  list-style-type: disc;
}

.bullet-textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 50px;
}

.bullet-textarea.is-invalid {
  border-color: red;
}

.char-count {
  font-size: 0.75rem;
  color: #888;
  position: absolute;
  right: 0.5rem;
  bottom: -1.1rem;
}

.error-text {
  color: red;
  font-size: 0.875rem;
}
</style>

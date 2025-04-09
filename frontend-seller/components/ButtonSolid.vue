<!-- components/ResizableButton.vue -->
<template>
  <button class="p-ButtonSolid" :class="[{ disabled }, sizeClass]" @click="$emit('click')" :disabled="disabled">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: String as PropType<'mini' | 'mid' | 'large'>,
    default: 'mid'
  },
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
defineEmits(['click'])

const sizeClass = computed(() => {
  switch (props.size) {
    case 'mini':
      return 'btn-mini'
    case 'large':
      return 'btn-large'
    default:
      return 'btn-mid'
  }
})
</script>

<style scoped>
.p-ButtonSolid {
  transition: background-color 0.2s ease;
  border-radius: var(--button-radius);
  background: var(--primary-a);
  color: var(--text-w);
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.p-ButtonSolid:hover {
  opacity: 0.9;
}

.p-ButtonSolid.disabled {
  pointer-events: none;
}

.btn-mini {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-mid {
  font-size: var(--text-size-1);
  padding: 0.75rem 1rem;
}

.btn-large {
  padding: 12px 24px;
  font-size: 16px;
}
</style>

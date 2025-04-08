<!-- components/ResizableButton.vue -->
<template>
  <button class="p-buttonsolid" :class="sizeClass" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  size?: 'mini' | 'mid' | 'large',
  label: String
}>()

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
.p-buttonsolid {
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.p-buttonsolid:hover {
  background-color: #0059c1;
}

.btn-mini {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-mid {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-large {
  padding: 12px 24px;
  font-size: 16px;
}
</style>

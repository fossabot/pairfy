<template>
  <div v-if="modelValue" class="wrapper" @click="close">
    <div v-if="overlay" class="overlay"></div>

    <div class="drawer" :class="[
      position === 'right' ? 'drawer-right' : 'drawer-left',
      { open: modelValue },
    ]" :style="{ width, transform: modelValue ? 'translateX(0)' : initialTransform }" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  position: {
    type: String,
    default: 'right',
    validator: val => ['left', 'right'].includes(val),
  },
  width: {
    type: String,
    default: '300px',
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

function close() {
  if (!props.persistent) {
    emit('update:modelValue', false)
  }
}

const initialTransform = computed(() =>
  props.position === 'right' ? 'translateX(100%)' : 'translateX(-100%)'
)
</script>

<style scoped>
.wrapper {
  inset: 0;
  position: fixed;
  z-index: 10000;
}

.overlay {
  inset: 0;
  z-index: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
}

.drawer {
  top: 0;
  z-index: 1;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  box-shadow: var(--shadow-a);
  transition: var(--transition-a);
  background: var(--background-a);
}

.drawer-right {
  right: 0;
}

.drawer-left {
  left: 0;
}
</style>

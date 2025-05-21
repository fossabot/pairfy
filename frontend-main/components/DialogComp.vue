<template>
  <div  class="dialog-backdrop" v-if="visible" @click="closeDialog">
    <div class="dialog-box" @click.stop>
      <slot />
      <button @click="closeDialog">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const visible = ref(false);

function openDialog() {
  visible.value = true;
}

function closeDialog() {
  visible.value = false;
}

defineExpose({ openDialog, closeDialog });
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;
}

.dialog-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
</style>

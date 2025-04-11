<template>
    <div class="toast-container">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', toast.type]"
        >
          <span class="toast-message">{{ toast.message }}</span>

          
          <button class="close-btn" @click="removeToast(toast.id)">×</button>

        </div>
      </transition-group>
    </div>
  </template>
  
  <script setup lang="ts">
  const toasts = ref<{ id: number; message: string; type: string }[]>([]);
  let counter = 0;
  
  // Show a new toast
  function showToast(
    message: string,
    type: "success" | "error" | "info" | "default" = "default",
    duration = 3000
  ) {
    const id = counter++;
    toasts.value.push({ id, message, type });
  
    setTimeout(() => removeToast(id), duration);
  }
  
  // Remove a toast manually
  function removeToast(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }
  
  defineExpose({ showToast });
  </script>
  
  <style scoped>
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .toast {
    position: relative;
    min-width: 240px;
    max-width: 320px;
    padding: 1rem;
    border-radius: var(--radius-b);
    box-shadow: var(--shadow-b);
    font-size: var(--text-size-1);
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  
  .toast.success {
    background-color: #e6f4ea;
    color: #216e39;
  }
  .toast.error {
    background-color: #fdecea;
    color: #b91c1c;
  }
  .toast.info {
    background-color: #e8f1fb;
    color: #1e3a8a;
  }
  .toast.default {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .toast-message {
    flex: 1;
    overflow-wrap: break-word;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    color: inherit;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
  }
  
  /* Transition */
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  
<template>
    <button>
        <slot name="content"></slot>
    </button>
</template>

<script setup>

</script>

<style lang="css" scoped>

button {
  background: var(--background-b);
  flex-direction: column;
  color: var(--text-b);
  border-radius: 50%;
  transition: 0.2s;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  border: none;
}
</style>
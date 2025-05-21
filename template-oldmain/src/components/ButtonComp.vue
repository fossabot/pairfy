<template>
    <div class="p-buttonx" :style="{ ...props.style }">
        {{ props.data }}
    </div>
</template>

<script setup>
const props = defineProps(['data', 'style'])
</script>

<style lang="css" scoped>
.p-buttonx {
    border-radius: 999px;
    font-size: var(--text-size-1);
    background: var(--primary-a);
    justify-content: center;
    color: var(--text-w);
    align-items: center;
    padding: 0 1.5rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    border: none;
    height: 3rem;
}

.p-buttonx:hover {
    opacity: 0.9;
}
</style>
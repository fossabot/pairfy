<template>
    <div class="tag flex" :class="{ contrast: type === 'contrast', discount: type === 'discount' }">
        {{ props.tag }}
    </div>
</template>

<script setup>
const props = defineProps(['tag', 'type']);

</script>

<style lang="css" scoped>
.tag {
    background: var(--background-b);
    font-size: var(--text-size-1);
    display: inline-flex;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: 400;
}

.contrast {
    background: #020617;
    color: var(--text-w);
}

.discount {
    background: var(--primary-a);
    color: var(--text-w);
}
</style>
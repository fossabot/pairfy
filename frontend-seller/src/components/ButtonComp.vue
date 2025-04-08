<template>
    <div class="p-solidbutton flex" :style="{ ...props.style }">
        <div v-if="icon" class="p-icon flex">
            <slot name="icon"></slot>
        </div>

        <span>{{ props.data }}</span>
    </div>
</template>

<script setup>
const props = defineProps(['data', 'style', 'icon'])
</script>

<style lang="css" scoped>
.p-solidbutton {
    border: 1px solid var(--primary-a);
    border-radius: var(--radius-b);
    font-size: var(--text-size-0);
    background: var(--primary-a);
    justify-content: center;
    color: var(--text-w);
    font-weight: 500;
    padding: 0 1rem;
    cursor: pointer;
    height: 2.75rem;
}

.p-solidbutton:hover {
    opacity: 0.9;
}

.p-icon {
    margin-right: 0.25rem;
}
</style>
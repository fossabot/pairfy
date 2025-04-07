<template>
    <div class="p-buttonx flex" :style="{ ...props.style }">
        <div class="p-icon flex">
            <slot name="icon"></slot>
        </div>

        <span>{{ props.data }}</span>
    </div>
</template>

<script setup>
const props = defineProps(['data', 'style'])
</script>

<style lang="css" scoped>
.p-buttonx {
    border: 1px solid var(--primary-a);
    font-size: var(--text-size-0);
    background: transparent;
    justify-content: center;
    color: var(--primary-a);
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    padding: 0 1rem;
    cursor: pointer;
    height: 2.5rem;
    display: flex;
}

.p-buttonx:hover {
    opacity: 0.9;
}

.p-icon {
    margin-right: 0.25rem
}
</style>
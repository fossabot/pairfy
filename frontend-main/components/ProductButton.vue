<template>
    <div class="ProductButton flex">
        <span class="icon">
            <slot name="icon"></slot>
        </span>
        <span class="content">
            <slot></slot>
        </span>
    </div>
</template>

<script setup>

</script>

<style scoped>
.ProductButton {
    border: 2px solid black;
    border-radius: var(--radius-c);
    font-size: var(--text-size-3);
    margin-top: 1rem;
    font-weight: 600;
    cursor: pointer;
    padding: 1.5rem;
}

.content {
    margin-left: 1rem;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

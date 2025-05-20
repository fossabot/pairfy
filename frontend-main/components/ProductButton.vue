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
    transition: var(--transition-a);
    border-radius: var(--radius-c);
    border: 1px solid rgba(0, 0, 0, 50%);
    margin-top: 1rem;
    font-weight: 600;
    cursor: pointer;
    padding: 1rem;
}

.ProductButton:focus {
    outline: 1px solid var(--primary-a);
}

.ProductButton:hover {
    border: 1px solid var(--primary-a);
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

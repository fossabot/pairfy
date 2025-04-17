<template>
    <div class="card">
        <div class="grid">
            <div class="grid-left">
                <div class="grid-title">
                    Create a new product
                </div>
                <div class="grid-subtitle">
                    Fill in the details to publish a new product.
                </div>
                <div class="grid-item">
                    <InputEmail />
                </div>
            </div>
            <div class="grid-right">Contenido secundario</div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.card {
    padding: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
}

.grid-left {
    background: var(--background-a);
    padding: 1.5rem;
}

.grid-right {
    background: var(--background-a);
    padding: 1rem;
}

.grid-title {
    font-size: var(--text-size-3);
    font-weight: bold;
}

.grid-subtitle {
    font-size: var(--text-size-1);
    color: var(--text-b);
    margin-top: 0.5rem;
}

.grid-item {
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
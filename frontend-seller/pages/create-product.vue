<template>
    <div class="card">
        <div class="grid">
            <div class="grid-left">

                <div class="grid-row">
                    <div class="grid-title">
                        Create a new product
                    </div>
                    <div class="grid-subtitle">
                        Fill in the details to publish a new product.
                    </div>
                    <div class="grid-item">
                        <InputProductName id="create-product-name" />
                    </div>
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

.grid-left {}

.grid-right {
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

.grid-row {
    background: var(--background-a);
    margin-top: 1rem;
    padding: 1.5rem;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
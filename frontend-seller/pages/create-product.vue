<template>
    <div class="card">
        <div class="grid">
            <div class="grid-left">
                <div class="grid-title">
                    Create Product
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
    background: var(--background-a);
}

.grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    padding: 1rem;
}

.grid-left {
    padding: 1rem;
}

.grid-right {
    padding: 1rem;
}

.grid-title {
    font-size: var(--text-size-3);
    font-weight: bold;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
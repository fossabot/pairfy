<template>
    <div class="container">

        <SearchPanel />

        <main class="results">
            <ProductGrid title="Results" />
        </main>
    </div>
</template>

<style scoped>
.container {
    grid-template-columns: 280px 1fr;
    padding-top: 8rem;
    display: grid;
    gap: 2rem;

}

.results {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
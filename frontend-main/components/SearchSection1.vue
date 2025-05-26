<template>
    <div class="container">

        <SearchPanel />

        <main class="results">
            <SearchPrompt />
            <DividerComp /> 
            <ProductGrid title="Results" />
        </main>
    </div>
</template>

<style scoped>
.container {
    grid-template-columns: 300px 1fr;
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
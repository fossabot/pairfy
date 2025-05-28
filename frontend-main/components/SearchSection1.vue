<template>
    <div class="SearchSection">

        <div class="SearchSection-body">
            <SearchPanel />

            <main class="SearchSection-results">
                <SearchPrompt />
                <DividerComp /> 
                <ProductGrid title="Results" />
            </main>
        </div>
    </div>
</template>

<style scoped>
.SearchSection {
    display: flex;
    justify-content: center;
}

.SearchSection-body {
    grid-template-columns: 280px 1fr;
    max-width: var(--body-a);
    padding-top: 8rem;
    display: grid;
    width: 100%;
    gap: 2rem;
}

.SearchSection-results {
    flex-direction: column;
    width: inherit;
    display: flex;
}
</style>
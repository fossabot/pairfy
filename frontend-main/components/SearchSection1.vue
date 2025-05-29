<template>
    <div class="SearchSection">
        <main class="SearchSection-body">
            <SearchPrompt />
            <DividerComp />
            <ProductGrid title="Results" />
        </main>
    </div>
</template>

<style scoped>
.SearchSection {
    width: 100%; 
    display: flex;
    justify-content: center;
}

.SearchSection-body {
    max-width: var(--body-a);
    flex-direction: column;
    margin-top: 6rem;
    width: inherit;
    display: flex;
 
}
</style>
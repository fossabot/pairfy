<template>
        <div class="search-bar-container">
            <input type="text" class="search-input" placeholder="Search In Cardano">
            <button class="search-button">
              <i class="pi pi-search"/>
            </button>
        </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.search-bar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
    border: 1px solid var(--border-a);
}

.search-input {
    width: 100%;
    padding: 0.5rem 1rem; 
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: var(--text-size-a);
    font-family: inherit;
}

.search-button {
    width: 36px;
    height: 36px;
    border: none;
    background: var(--primary-c);
    border-radius: 8px;
    cursor: pointer;
    color: var(--text-w);
}

.search-button:hover {
    background: var(--primary-a);
}

.search-icon {
    width: 20px;
    height: 20px;
}
</style>
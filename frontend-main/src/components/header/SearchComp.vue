<template>
    <div class="search" :class="{ focus: isFocus }"
        :style="{ backgroundColor: searchInput.length ? 'var(--background-a)' : 'var(--background-b)' }">
        <input v-model="searchInput" type="text" class="search-input" placeholder="Search Cardano"
            @focus="isFocus = true" @blur="isFocus = false">
        <button class="search-button" :class="{ focus: isFocus }">
            <i class="pi pi-search" />
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchInput = ref("");

const isFocus = ref(false);

</script>

<style lang="css" scoped>
.search {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 100%;
    margin: 0 auto;
    border: 1px solid var(--text-a);
    overflow: hidden;

}

.search.focus {
    background: var(--background-b);
    border: 1px solid var(--text-a);
    outline: 2px solid color-mix(in srgb, rgba(255, 255, 255, 0.5), transparent 5%);
    outline-offset: 1px;
}

.search-input {
    width: 100%;
    padding: 0.65rem 1rem;
    border: none;
    outline: none;
    font-size: var(--text-size-1);
    font-family: inherit;
    background: inherit;
    font-weight: 500;
}

.search-input::placeholder{
    color: var(--text-b);
}

.search-button {
    padding: 0 0.75rem;
    height: 40px; 
    border: none;
    background: color-mix(in srgb,var(--primary-c),transparent 60%);
    border-radius: 0 3px 3px 0;
    cursor: pointer;
}

.search-button.focus {
    outline-offset: -1px;
}

.search-button:hover {
    background: var(--primary-b);
}

.search-icon {
    width: 20px;
    height: 20px;
}
</style>
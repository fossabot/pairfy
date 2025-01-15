<template>
    <div class="search" :class="{ focus: isFocus }"
        :style="{ backgroundColor: searchInput.length ? 'var(--background-b)' : 'var(--background-b)' }">
        <input v-model="searchInput" type="text" class="search-input" placeholder="Search products"
            @focus="isFocus = true" @blur="isFocus = false">
        <button class="search-button flex" :class="{ focus: isFocus }"> 
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
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
   
}

.search.focus {
    background: var(--background-b);
    outline: 3px solid color-mix(in srgb, rgba(255, 255, 255, 0.5), transparent 60%);
    outline-offset: 0px;
}

.search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    outline: none;
    font-size: var(--text-size-1);
    font-family: inherit;
    background: inherit;
    font-weight: 500;
}

.search-input::placeholder {
    color: var(--text-b);
    opacity: 0.5;
}

.search-button {
    padding: 0 1rem;
    height: 44px;
    border: none;
    background: var(--primary-a);
    cursor: pointer;
    color: var(--text-w);
    border-radius: 0 12px 12px 0;
    outline: 1px solid var(--primary-a);
    outline-offset: -1px;
}

.search-button i{
    font-weight: 600;
}

.search-button:hover {
   opacity: 0.9;
}

.search-icon {
    width: 20px;
    height: 20px;
}
</style>
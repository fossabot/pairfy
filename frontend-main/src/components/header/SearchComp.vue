<template>
    <div class="search" :class="{ focus: isFocus }"
        :style="{ backgroundColor: searchInput.length ? 'var(--background-a)' : 'var(--background-b)' }">
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
    justify-content: center;
    border-radius: 999px;
    width: 100%;
    margin: 0 auto;
    border: 1px solid transparent;
    overflow: hidden;

}

.search.focus {
    background: var(--background-b);
    border: 1px solid transparent;
    outline: 2px solid color-mix(in srgb, rgba(255, 255, 255, 0.5), transparent 60%);
    outline-offset: 1px;
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
    background: transparent;
    cursor: pointer;
}

.search-button i{
    font-weight: 600;
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
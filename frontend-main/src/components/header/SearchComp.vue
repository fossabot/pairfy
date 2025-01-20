<template>
    <div class="search" :class="{ focus: isFocus }">
        <input v-model="searchInput" type="text" class="search-input" placeholder="Search products"
            @focus="isFocus = true" @blur="isFocus = false" @keydown.enter="handleSearch">
        <button class="search-button flex" :class="{ focus: isFocus }" @click="handleSearch">
            <i class="pi pi-search" />
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const isFocus = ref(false);

const searchInput = ref("");

const handleSearch = () => {
    const text = searchInput.value.trim();

    if (text) {
        console.log("Performing search for:", text);

        router.push({
            name: 'search',
            query: {
                text: text
            }
        })

    } else {
        console.warn("Search query is empty. Please enter a query.");
    }
}
</script>

<style lang="css" scoped>
.search {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: var(--background-b);
}

.search.focus {
    background: var(--background-a);
    outline: 3px solid color-mix(in srgb, rgba(255, 255, 255, 0.5), var(--primary-a) 20%);
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

.search-button i {
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
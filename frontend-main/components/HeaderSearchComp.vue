<template>
    <div class="header-search">
        <input class="search-input" v-model="searchQuery" @input="onInput" @keydown.enter.prevent="emitSearch"
            type="text" placeholder="iphone 16" />

        <button class="search-button" @click="emitSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search">
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
            </svg>
        </button>

        <ul class="suggestions-list" v-if="showSuggestions && suggestions.length">
            <li v-for="(item, index) in suggestions" :key="index" @click="selectSuggestion(item)"
                class="suggestion-item">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ProductSuggestion {
    id: string | number
    name: string
}

const searchQuery = ref('')
const suggestions = ref<ProductSuggestion[]>([])
const showSuggestions = ref(false)

const emit = defineEmits<{
    (e: 'search', query: string): void
    (e: 'suggest', query: string): void
    (e: 'select', item: ProductSuggestion): void
}>()

let timeout: number | undefined

const onInput = () => {
    showSuggestions.value = true
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        emit('suggest', searchQuery.value)
    }, 300)
}

const emitSearch = () => {
    showSuggestions.value = false
    emit('search', searchQuery.value)
}

const selectSuggestion = (item: ProductSuggestion) => {
    searchQuery.value = item.name
    showSuggestions.value = false
    emit('select', item)
}
</script>

<style scoped>
.header-search {
    position: relative;
    margin-left: auto;
    width: 100%;
    max-width: 50%;
}

.search-input {
    width: 100%;
    outline: none;
    color: var(--text-w);
    padding: 0.75rem 1rem;
    box-sizing: border-box;
    background: transparent;
    font-size: var(--text-size-1);
    border-radius: var(--radius-c);
    transition: var(--transition-a);
    border: 2px solid rgba(255, 255, 255, 70%);
}

.search-input:hover{
    border: 2px solid rgba(255, 255, 255, 100%);
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.75);
}

.search-input:focus::placeholder {
  opacity: 0;
}

.search-button {
    color: rgba(255, 255, 255, 0.75);
    transform: translateY(-50%);
    background: transparent;
    border-radius: 999px;
    position: absolute;
    cursor: pointer;
    height: inherit;
    padding: 0.5rem;
    display: flex;
    right: 0.5rem;
    border: none;
    top: 50%;
}

.suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid white;
    border-radius: 4px;
    margin-top: 5px;
    list-style: none;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.suggestion-item {
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
}

.suggestion-item:hover {
    background-color: #f5f5f5;
}
</style>
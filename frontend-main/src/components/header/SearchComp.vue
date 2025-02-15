<template>
    <div class="search" :class="{ focus: isFocus }">
        <input v-model="searchInput" type="text" class="search-input" placeholder="Search Cardano"
            @focus="isFocus = true" @blur="isFocus = false" @keydown.enter="handleSearch">
        <button class="search-button flex" :class="{ focus: isFocus }" @click="handleSearch">
            <i class="pi pi-search" />
        </button>
    </div>
</template>

<script setup>
import { ref, inject, onBeforeUnmount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { randomString } = inject('utils');

const router = useRouter();

const theRoute = useRoute();

const isFocus = ref(false);

const searchInput = ref("");

const unwatchRoute = watch(theRoute,
    (route) => {
        searchInput.value = route.query.k
    },
    { immediate: true }
);

const handleSearch = () => {
    const text = searchInput.value.trim();

    if (text) {
        router.push({
            name: 'search',
            query: {
                k: text,
                tag: randomString(10)
            }
        })

    } else {
        console.warn("Search query is empty");
    }
}

onBeforeUnmount(() => {
    unwatchRoute()
})
</script>

<style lang="css" scoped>
.search {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: var(--background-a);
    border: 1px solid var(--background-c);
}

.search.focus {
    background: var(--background-a);
    border: 1px solid var(--yellow-a);
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
    font-weight: 400;
    opacity: 0.8;
}

.search-button {
    padding: 0 1rem;
    height: 44px;
    border: none;
    cursor: pointer;
    color: var(--text-a);
    border-radius: 0 12px 12px 0;
    outline-offset: -1px;
    outline: 1px solid transparent;
    background: color-mix(in srgb, var(--pastel-yellow) 100%, transparent);
}

.search-button i {
    font-weight: 600;
}

.search-button:hover {
    opacity: 0.8;
}

.search-icon {
    width: 20px;
    height: 20px;
}
</style>
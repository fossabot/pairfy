<template>
    <div class="search flex" :class="{ focus: isFocus }">
        <SelectorComp/>
        <input v-model="searchInput" type="text" class="search-input" placeholder="Search"
            @focus="isFocus = true" @blur="isFocus = false" @keydown.enter="handleSearch">
        <button class="search-button flex" :class="{ focus: isFocus }" @click="handleSearch">
            <i class="pi pi-search" />
        </button>
    </div>
</template>

<script setup>
import { ref, inject, onBeforeUnmount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SelectorComp from './SelectorComp.vue';

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
    width: 100%;
    height: 3rem;
    overflow: hidden;
    border-radius: 5px;
    background: var(--background-a);
}

.search.focus {
    background: var(--background-a);
}

.search-input {
    width: 100%;
    height: inherit;
    border: none;
    outline: none;
    font-size: var(--text-size-1);
    font-family: inherit;
    background: inherit;
    font-weight: 500;
    padding: 0 1rem;
}

.search-input::placeholder {
    color: var(--text-a);
    font-weight: 400;
    opacity: 0.8;
}

.search-button {
    border-left: 1px solid var(--border-a);
    background: var(--primary-a);
    color: var(--text-w);
    padding: 0 1.25rem;
    cursor: pointer;
    height: 100%;
    border: none;
}

.search-button i {
    font-size: var(--text-size-2);
    font-weight: 600;
}

.search-button:hover {
    opacity: 0.8;
}


</style>
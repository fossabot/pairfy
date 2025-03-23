<template>
    <div class="search column">
        <div class="search-bar flex" :class="{ focus: isFocus }">
            <SelectorComp />
            <input v-model="searchInput" type="text" class="search-input" placeholder="Search" @focus="isFocus = true"
                @blur="isFocus = false" @keydown.enter="handleSearch">
            <button class="search-button flex" :class="{ focus: isFocus }" @click="handleSearch">
                <i class="pi pi-search" />
            </button>
        </div>

        <div class="search-filter">
            <div class="search-filter-button">
                filter
            </div>
            <div class="search-filter-button">
                Category
            </div>
            <div class="search-filter-button">
                Price
            </div>
            <div class="search-filter-button">
                Price
            </div>
        </div>
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
    margin-top: 0.5rem;
    width: 100%;
}

.search-bar {
    height: 3rem;
    width: inherit;
    overflow: hidden;
    border-radius: 5px;
    background: var(--background-a);
    outline: 1px solid var(--primary-a);
}

.search-bar.focus {}

.search-input {
    width: inherit;
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


.search-filter {
    justify-content: space-between;
    padding: 0.5rem 0;
    display: none;
}

.search-filter-button {
    background: var(--background-b);
    font-size: var(--text-size-0);
    padding: 0.25rem 1rem;
    line-height: initial;
    border-radius: 99px;
    align-items: center;
    display: flex;
}


/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
    .search-bar {
        height: 2.5rem;
    }

    .search-filter {
        display: flex;
    }

}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
    /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
    /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
    /* Styles for large screens */
}
</style>
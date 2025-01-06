<template>
    <div class="category">
        <div class="tag-body">
            <div class="tag" v-for="(category, index) in categoryList" :key="index">{{ category.name }}</div>
        </div>
    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
import { ref } from 'vue';

const categoryList = ref(categories)
</script>

<style lang="css" scoped>
.category {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
}

.tag-body {
    width: inherit;
    max-width: 1600px;
    gap: 1rem;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
}

.tag {
    background: var(--background-a);
    text-align: center;
    padding: 1rem;
    border-radius: 999px;
    font-size: var(--text-size-1);
    transition: 0.2s;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
}

.tag:hover {
    background: var(--soft-red-a);
}
</style>
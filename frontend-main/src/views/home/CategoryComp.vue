<template>
    <div class="p-category">
        <div class="category-grid">
            <div class="grid">
                <div v-for="category in categories" :key="category.index" class="grid-item"
                    @click="goToCategory(category)">
                    <img :src="category.icon" :alt="category.name" class="icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import categoryList from '@/assets/categories.json';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import image0 from '@/assets/icons/0.png'
import image1 from '@/assets/icons/1.png'
import image4 from '@/assets/icons/4.png'
import image7 from '@/assets/icons/7.png'
import image8 from '@/assets/icons/8.png'
import image10 from '@/assets/icons/10.png'
import image11 from '@/assets/icons/11.png'
import image12 from '@/assets/icons/12.png'
import image13 from '@/assets/icons/13.png'
import image14 from '@/assets/icons/14.png'

const router = useRouter()

const categories = ref(categoryList)

categories.value[0].icon = image0
categories.value[1].icon = image1

categories.value[4].icon = image4
categories.value[7].icon = image7
categories.value[8].icon = image8
categories.value[10].icon = image10 
categories.value[11].icon = image11 
categories.value[12].icon = image12

categories.value[13].icon = image13
categories.value[14].icon = image14

function goToCategory(category) {
    router.push({ name: 'CategoryPage', params: { slug: category.name.toLowerCase() } })
}
</script>

<style scoped>
.p-category {
    width: 100%;
    margin-top: 1rem;
    max-width: var(--body-a);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
}

.grid-item {
    transition: box-shadow 0.2s ease;
    background: var(--background-a);
    border-radius: var(--radius-b);
    box-shadow: var(--shadow-b);
    text-align: center;
    cursor: pointer;
    padding: 1rem;
}

.grid-item:hover {
    box-shadow: var(--shadow-a);
}

.icon {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
}
</style>
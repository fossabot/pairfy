<template>
    <div class="p-category">
        <div class="category-grid">
            <div class="grid">
                <div v-for="category in categories" :key="category.id" class="grid-item"
                    @click="goToCategory(category)">
                    <img :src="category.icon" :alt="category.name" class="icon" />
                    <p class="label">{{ category.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import image0 from '@/assets/items/laptop.png'
import image1 from '@/assets/items/clothes.png'

const router = useRouter()

const categories = [
    { id: 1, name: 'Electronics', icon: image0 },
    { id: 2, name: 'Clothing', icon: image1 },
    { id: 3, name: 'Books', icon: 'https://img.icons8.com/ios/100/books.png' },
    { id: 4, name: 'Shoes', icon: 'https://img.icons8.com/ios/100/shoes.png' },
    { id: 5, name: 'Beauty', icon: 'https://img.icons8.com/ios/100/edit.png' },
    { id: 6, name: 'Home', icon: 'https://img.icons8.com/ios/100/home.png' },
]

function goToCategory(category) {
    router.push({ name: 'CategoryPage', params: { slug: category.name.toLowerCase() } })
}
</script>

<style scoped>
.p-category{
    width: 100%;
    margin-top: 1rem;
    max-width: var(--body-a);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
}

.grid-item {
    transition: box-shadow 0.2s ease;
    border-radius: var(--radius-a);
    box-shadow: var(--shadow-b);
    text-align: center;
    cursor: pointer;
    padding: 1rem;
}

.grid-item:hover {
    box-shadow: var(--shadow-a);
}

.icon {
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-bottom: 8px;
}

.label {
    font-size: 14px;
    font-weight: 500;
}
</style>
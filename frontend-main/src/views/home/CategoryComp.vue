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

const router = useRouter()

const categories = [
    { id: 1, name: 'Electronics', icon: 'https://img.icons8.com/ios/100/laptop.png' },
    { id: 2, name: 'Clothing', icon: 'https://img.icons8.com/ios/100/clothes.png' },
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
    max-width: var(--body-a);
    margin-top: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
}

.grid-item {
    border-radius: 16px;
    box-shadow: var(--shadow-b);
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: box-shadow 0.2s ease;
}

.grid-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
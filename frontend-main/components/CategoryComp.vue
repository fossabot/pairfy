<template>
    <div class="p-category">
        <div class="category-title">
            All Categories
        </div>
        <div class="category-grid">
            <div class="grid">
                <div class="grid-item" v-for="category in categories" :key="category.index"
                    @click="goToCategory(category)" @mouseover="showModal(category.index)" @mouseleave="hideModal">
                    <div class="name flex">
                        {{ category.label }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import categoryList from '@/assets/json/categories.json';

const router = useRouter()

const categories = ref(categoryList)

const activeIndex = ref(0);

function goToCategory(category) {
    router.push({ name: 'search', query: { k: category.name.toLowerCase() } })
}

function showModal(index) {
    activeIndex.value = index;
};

function hideModal() {
    activeIndex.value = null;
}
</script>

<style scoped>
.p-category {
    width: 100%;
    max-width: var(--body-a);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1rem;
}

.grid-item {
    background: rgba(255, 255, 255, 10%);
    transition: box-shadow 0.2s ease;
    border-radius: 12px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
}

.grid-item:hover {
    box-shadow: var(--shadow-a);
}

.icon {
    width: 100%;
    object-fit: contain;
}

.name {
    font-size: 1rem;
    font-weight: 400;
    font-size: var(--text-size-2);
    text-align: center;
    justify-content: center;
    padding: 1rem;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.category-title {
    font-size: var(--text-size-5);
    margin-bottom: 1rem;
    font-weight: 700;
    margin-top: 2rem;
    color: white;
}
</style>
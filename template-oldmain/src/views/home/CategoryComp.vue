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
                        {{ category.name }}
                    </div>

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
import image2 from '@/assets/icons/2.png'
import image3 from '@/assets/icons/3.png'
import image4 from '@/assets/icons/4.png'
import image5 from '@/assets/icons/5.png'
import image6 from '@/assets/icons/6.png'
import image7 from '@/assets/icons/7.png'
import image8 from '@/assets/icons/8.png'
import image9 from '@/assets/icons/9.png'
import image10 from '@/assets/icons/10.png'
import image11 from '@/assets/icons/11.png'
import image12 from '@/assets/icons/12.png'
import image13 from '@/assets/icons/13.png'
import image14 from '@/assets/icons/14.png'

const router = useRouter()

const categories = ref(categoryList)

categories.value[0].icon = image0
categories.value[1].icon = image1
categories.value[2].icon = image2
categories.value[3].icon = image3
categories.value[4].icon = image4
categories.value[5].icon = image5
categories.value[6].icon = image6
categories.value[7].icon = image7
categories.value[8].icon = image8
categories.value[9].icon = image9
categories.value[10].icon = image10
categories.value[11].icon = image11
categories.value[12].icon = image12

categories.value[13].icon = image13
categories.value[14].icon = image14

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
    gap: 2rem;
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
    color: var(--text-w);
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
<template>
    <div class="category">
        <div class="title flex">
            <span>Trending on Cardano</span>
            <img class="icon" src="@/assets/icons/hot.png" alt="">
        </div>

        <div class="grid-container">
            <div class="column first">
                <div v-for="(category, index) in column1" :key="index" class="card"
                    :style="{ backgroundImage: `url(${getURL(category.index)})`, backgroundPositionY: '70%' }"
                    @click="searchCategory(category.name)">
                    <h3>{{ category.name }}</h3>
                </div>
            </div>
            <div class="column second">
                <div v-for="(category, index) in column2" :key="index" class="card"
                    :style="{ backgroundImage: `url(${getURL(category.index)})`, backgroundPositionY: '15%' }"
                    @click="searchCategory(category.name)">
                    <h3>{{ category.name }}</h3>

                </div>
            </div>
            <div class="column third">
                <div v-for="(category, index) in column3" :key="index" class="card">
                    <h3>{{ category.name }}</h3>

                </div>
            </div>
        </div>

        
    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
import asset0 from "@/assets/icons/0.jpeg";
import asset1 from "@/assets/icons/1.jpeg";
import asset2 from "@/assets/icons/2.jpeg";
import asset3 from "@/assets/icons/3.jpeg";
import asset4 from "@/assets/icons/4.jpeg";
import asset5 from "@/assets/icons/5.jpeg";
import asset6 from "@/assets/icons/6.jpeg";
import asset7 from "@/assets/icons/7.jpeg";
import asset8 from "@/assets/icons/8.jpeg";
import asset9 from "@/assets/icons/9.jpeg";
import asset10 from "@/assets/icons/10.jpeg";
import asset11 from "@/assets/icons/11.jpeg";
import asset12 from "@/assets/icons/12.jpeg";
import asset13 from "@/assets/icons/13.jpeg";
import asset14 from "@/assets/icons/14.jpeg";
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const categoryList = ref(categories);

const route = useRoute();

const router = useRouter();

const assets = ref({
    0: asset0,
    1: asset1,
    2: asset2,
    3: asset3,
    4: asset4,
    5: asset5,
    6: asset6,
    7: asset7,
    8: asset8,
    9: asset9,
    10: asset10,
    11: asset11,
    12: asset12,
    13: asset13,
    14: asset14
});

const getURL = (index) => {
    return assets.value[index]
}

const searchCategory = (name) => {
    router.push({
        name: 'search',
        params: route.params,
        query: {
            k: name
        }
    })
}

const categoryArray = Object.values(categoryList.value);

const column1 = categoryArray.slice(0, 3);
const column2 = categoryArray.slice(3, 6);
const column3 = categoryArray.slice(6, 9);
</script>

<style lang="css" scoped>
.category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.title {
    width: inherit;
    font-size: var(--text-size-4);
    max-width: var(--body-a);
    font-weight: 600;
    margin-top: 2rem;
}

.tag {
    background: var(--background-a);
    font-size: var(--text-size-1);
    border-radius: 999px;
    text-align: center;
    transition: 0.2s;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    align-items: center;
    overflow: hidden;
    color: var(--text-a);
    font-weight: 400;
    display: flex;
}

.tag:hover {
    background: var(--background-c);
}

.image {
    border-radius: 50%;
    justify-content: center;
    overflow: hidden;
    width: calc(70px - 0.25rem);
    padding: 0.25rem;
}

.image img {
    width: 100%;
    height: auto;
    border-radius: 50%;
}

.name {
    margin: 0 1rem;
}

.icon {
    width: 34px;
}


.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: var(--body-a);
    height: 80vh;
    margin-top: 1rem;
}

.column {
    display: grid;
    gap: 1rem;
}

.column:first-child {
    grid-template-rows: 25% 50% 25%;
}

.column:nth-child(2) {
    grid-template-rows: 37.5% 37.5% 25%;
}

.column:last-child {
    grid-template-rows: 25% 50% 25%;
}

.card {
    background: var(--background-a);
    font-size: var(--text-size-3);
    box-shadow: var(--shadow-b);
    justify-content: center;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 6px;
    color: var(--text-w);
    font-weight: bold;
    background-size: cover;
    background-repeat: no-repeat;
    
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        height: auto;
    }

    .column {
        grid-template-rows: auto;
    }
}
</style>
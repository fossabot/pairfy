<template>
    <div class="category">
        <BandComp />
        <div class="category-grid">
            <div class="category-col first">
                <div class="category-card" v-for="(item, index) in columnLeft" :key="index"
                    @click="searchCategory(item.name)">
                    <div class="category-title">{{ item.name }}</div>
                    <div class="category-body" :style="{ background: item.background }">
                        <div class="category-image"
                            :style="{ backgroundImage: `url(${getURL(item.index)})`, backgroundPositionY: item.y, backgroundPositionX: item.x }" />
                    </div>
                </div>
            </div>
            <div class="category-col second">
                <div class="category-card" v-for="(item, index) in columnCenter" :key="index"
                    @click="searchCategory(item.name)">
                    <div class="category-title">{{ item.name }}</div>
                    <div class="category-body" :style="{ background: item.background }">
                        <div class="category-image"
                            :style="{ backgroundImage: `url(${getURL(item.index)})`, backgroundPositionY: item.y, backgroundPositionX: item.x }" />
                    </div>

                </div>
            </div>
            <div class="category-col third">
                <div class="category-card" v-for="(item, index) in columnRight" :key="index"
                    @click="searchCategory(item.name)">
                    <div class="category-title">{{ item.name }}</div>
                    <div class="category-body" :style="{ background: item.background }">
                        <div class="category-image"
                            :style="{ backgroundImage: `url(${getURL(item.index)})`, backgroundPositionY: item.y, backgroundPositionX: item.x }" />
                    </div>
                </div>
            </div>

            <div class="category-col four">
                <div class="category-card" v-for="(item, index) in columnBottom" :key="index"
                    @click="searchCategory(item.name)">
                    <div class="category-title">{{ item.name }}</div>
                    <div class="category-body" :style="{ background: item.background }">
                        <div class="category-image"
                            :style="{ backgroundImage: `url(${getURL(item.index)})`, backgroundPositionY: item.y, backgroundPositionX: item.x }" />
                    </div>
                </div>
            </div>
        </div>

        <div class="title flex">
            <span>Trending on Cardano</span>
            <img class="icon" src="@/assets/icons/hot.png" alt="">
        </div>


        <div class="banner flex">
            <div class="banner-item" v-for="(item, index) in columnBottom" :key="index">
                <img class="banner-image" :src="getURL(item.index)" alt="">
                <span class="banner-name">{{ item.name }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import BandComp from '@/views/home/BandComp.vue';
import categories from '@/assets/categories.json';
import asset0 from "@/assets/icons/0.png";
import asset1 from "@/assets/icons/1.png";
import asset2 from "@/assets/icons/2.png";
import asset3 from "@/assets/icons/3.png";
import asset4 from "@/assets/icons/4.png";
import asset5 from "@/assets/icons/5.png";
import asset6 from "@/assets/icons/6.png";
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

const columnLeft = categoryArray.slice(0, 3);
const columnCenter = categoryArray.slice(3, 6);
const columnRight = categoryArray.slice(6, 9);
const columnBottom = categoryArray.slice(9, 15);
</script>

<style lang="css" scoped>
.category {
    flex-direction: column;
    justify-content: center;
    color: var(--text-a);
    align-items: center;
    position: relative;
    display: flex;
    width: 100%;
}

.title {
    font-size: var(--text-size-4);
    max-width: var(--body-a);
    font-weight: bold;
    margin-top: 2rem;
    width: inherit;
}

.category-title {
    width: inherit;
    text-align: left;
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

.banner-image {
    border-radius: 50%;
    overflow: hidden;
    width: 150px;
}


.icon {
    width: 34px;
}

.category-grid {
    grid-template-columns: repeat(4, 1fr);
    display: grid;
    gap: 1rem;
    width: 100%;
    height: 115vh;
    max-width: var(--body-a);
    max-height: var(--body-a);
    margin-top: 350px;
    z-index: 2;
}

.category-col {
    display: grid;
    gap: 1rem;
}

.category-col:first-child {
    grid-template-rows: 1fr 2fr 1fr;
}

.category-col:nth-child(2) {
    grid-template-rows: 1.5fr 1.5fr 1fr;
}

.category-col:last-child {
    grid-template-rows: 1fr 2fr 1fr;
}

.category-card {
    background: var(--background-a);
    font-size: var(--text-size-3);
    box-shadow: var(--shadow-b);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 0px;
    font-weight: 700;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    padding: 1rem;
    width: 100%;
}

.category-body {
    margin-top: 0.5rem;
    width: inherit;
    height: 100%;
}

.category-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .category-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        height: auto;
    }

    .category-col {
        grid-template-rows: auto;
    }
}




.banner {
    width: inherit;
    max-width: var(--body-a);
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    border-radius: 0px;
    margin: 2rem 0;
    gap: 2rem;
}

.banner-item {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
}

.banner-name {
    font-size: var(--text-size-2);
    white-space: break-spaces;
    word-break: break-word;
    text-align: center;
    margin-top: 1rem;
    font-weight: 500;
    height: 45px;
}

</style>
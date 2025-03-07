<template>
    <div class="category">
        <div class="category-grid">
            <div class="category-col">
               <CategoryComp />
            </div>
            <div class="category-col">
                <BandComp/>
                <GridComp />
            </div>
            <div class="category-col">

            </div>

        </div>


    </div>
</template>

<script setup>
import CategoryComp from '@/views/home/CategoryComp.vue';
import BandComp from '@/views/home/BandComp.vue';
import GridComp from '@/views/home/GridComp.vue';
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
import { ref } from 'vue';

const categoryList = ref(categories);

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



const categoryArray = Object.values(categoryList.value);

const columnOne = categoryArray.slice(0, 3);
const columnTwo = categoryArray.slice(3, 6);
const columnThree = categoryArray.slice(6, 9);
const columnFour = categoryArray.slice(9, 12);
const columnFive = categoryArray.slice(9, 15);
</script>

<style lang="css" scoped>
.category {
    flex-direction: column;
    justify-content: center;
    color: var(--text-a);
    align-items: center;
    display: flex;
    width: 100%;
}

.category-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: 1fr 3.5fr 1fr;
    margin-top: 1rem;
    display: grid;
    z-index: 2;
    gap: 1rem;
    width: 100%;
    max-width: var(--body-a);
    max-height: var(--body-a);
}

.category-col {
    display: grid;
    gap: 1rem;
}

.category-col:first-child {
    grid-template-rows: auto;
}

.category-col:nth-child(2) {
    grid-template-rows: 1.5fr 1.5fr;
}

.category-col:last-child {
    grid-template-rows: 1fr 2fr;
    background: var(--background-b);
}

.category-card {
    background: var(--background-b);
    font-size: var(--text-size-3);
    box-shadow: var(--shadow-b);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 12px;
    font-weight: 700;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    padding: 1rem;
    width: 100%;
}

.category-title {
    width: inherit;
    text-align: left;
}

.category-body {
    border-radius: 12px;
    overflow: hidden;
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
</style>
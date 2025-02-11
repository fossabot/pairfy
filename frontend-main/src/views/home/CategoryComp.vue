<template>
    <div class="category">
        <div class="categories">
            <div class="tag" v-for="(category, index) in categoryList" :key="index"
                @click="searchCategory(category.name)">

                <span class="image flex">
                    <img :src="getURL(index)" alt="">
                </span>

                <span class="name">{{ category.name }}</span>

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
import asset5 from "@/assets/icons/5.svg";
import asset6 from "@/assets/icons/6.svg";
import asset7 from "@/assets/icons/7.svg";
import asset8 from "@/assets/icons/8.svg";
import asset9 from "@/assets/icons/9.svg";
import asset10 from "@/assets/icons/10.svg";
import asset11 from "@/assets/icons/11.svg";
import asset12 from "@/assets/icons/12.svg";
import asset13 from "@/assets/icons/13.svg";
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
    13: asset13
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
</script>

<style lang="css" scoped>
.category {
    width: 100%;
    display: flex;
    justify-content: center;
}

.tag {
    font-size: var(--text-size-1);
    text-align: center;
    padding: 0.5rem;
    border-radius: 999px;
    transition: 0.2s;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.tag:hover {
    background: var(--soft-cyan-a);
}

.categories {
    width: inherit;
    max-width: var(--body-a);
    gap: 0.5rem;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
    background: var(--background-a);
    padding: 1rem;
    border-radius: 16px;
}

.image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    justify-content: center;
    overflow: hidden;
    background: var(--background-a);
}

.image img {
    width: 50px;
    height: auto;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimizequality;
}

.name {
    margin: 0 0.5rem;
    font-size: var(--text-size-1);
}
</style>
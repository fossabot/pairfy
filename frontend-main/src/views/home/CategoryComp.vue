<template>
    <div class="category">
        <div class="tag-body">
            <div class="tag" v-for="(category, index) in categoryList" :key="index">

                <img :src="getURL(index)" alt="">

                <span>{{ category.name }}</span>

            </div>
        </div>
    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
import { ref } from 'vue';
import asset0 from "@/assets/icons/0.png";
import asset1 from "@/assets/icons/1.png";
import asset2 from "@/assets/icons/2.png";
import asset3 from "@/assets/icons/3.png";
import asset4 from "@/assets/icons/4.png";
import asset5 from "@/assets/icons/5.png";
import asset6 from "@/assets/icons/6.png";
import asset7 from "@/assets/icons/7.png";
import asset8 from "@/assets/icons/8.png";
import asset9 from "@/assets/icons/9.png";
import asset10 from "@/assets/icons/10.png";
import asset11 from "@/assets/icons/11.png";
import asset12 from "@/assets/icons/12.png";
import asset13 from "@/assets/icons/13.png";

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
    13: asset13
});

const getURL = (index) => {
    return assets.value[index]
}
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
    background: var(--background-bs);
    text-align: center;
    padding: 1rem;
    border-radius: 999px;
    font-size: var(--text-size-1);
    transition: 0.2s;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.tag:hover {
    background: var(--soft-red-a);
}

.tag img {
    height: auto;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimizequality;
}

.tag span {
    margin-left: 0.5rem;
}
</style>
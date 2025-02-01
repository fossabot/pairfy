<template>
    <div class="category">
        <div class="tag-body">
            <div class="tag" v-for="(category, index) in categoryList" :key="index">

                <span class="image flex">
                    <img :src="getURL(index)" alt="">
                </span>

                <span class="name">{{ category.name }}</span>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import categories from '@/assets/categories.json';
import asset0 from "@/assets/icons/0.svg";
import asset1 from "@/assets/icons/1.svg";
import asset2 from "@/assets/icons/2.svg";
import asset3 from "@/assets/icons/3.svg";
import asset4 from "@/assets/icons/4.svg";
import asset5 from "@/assets/icons/5.svg";
import asset6 from "@/assets/icons/6.svg";
import asset7 from "@/assets/icons/7.svg";
import asset8 from "@/assets/icons/8.svg";
import asset9 from "@/assets/icons/9.svg";
import asset10 from "@/assets/icons/10.svg";
import asset11 from "@/assets/icons/11.svg";
import asset12 from "@/assets/icons/12.svg";
import asset13 from "@/assets/icons/13.svg";

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
}

.tag {
    background: var(--background-b);
    text-align: center;
    padding: 0.5rem;
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
    background: var(--soft-cyan-a);
}

.tag-body {
    width: inherit;
    max-width: var(--body-a);
    gap: 0.5rem;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
}

.image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary-a);
    justify-content: center;
  
}

.image img {
    width: var(--text-size-4);
    height: auto;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimizequality;
    filter: invert(1);
}

.name {
    margin: 0 0.5rem;

}
</style>
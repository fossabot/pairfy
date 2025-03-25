<template>
    <div class="container">
        <div class="box" v-for="(item, index) in gridData" :key="index">
            <div class="box-head flex">
                <div class="title flex">
                    <span>{{ item.title }}</span>
                    <span class="tag" v-if="item.tag">{{ item.tag_value }}</span>
                </div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="box-content">
                <div class="grid one">
                    <div class="grid-item" v-for="sub in item.items" :key="sub">
                        <img class="grid-image" :src="sub.image" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import image1 from '@/assets/icons/1.png'
import image2 from '@/assets/icons/2.png'
import image3 from '@/assets/icons/3.png'
import image4 from '@/assets/icons/4.png'
import image5 from '@/assets/icons/5.png'
import { ref, inject } from 'vue';

const { formatPriceToUSD } = inject('utils');

const gridData = ref([
    {
        title: "Top best sellers of the week",
        tag: true,
        tag_value: "-50% Deals",
        tag_color: 'var(--primary-a)',
        items: [
            {
                image: image1,
                price: 34.00
            },
            {
                image: image2,
                price: 23.00
            },
            {
                image: image3,
                price: 34.00
            },
            {
                image: image4,
                price: 23.00
            }
        ]
    },

    {
        title: "Supplies for your work",
        tag: false,
        tag_value: "",
        tag_color: '',
        items: [
        {
                image: image1,
                price: 34.00
            },
            {
                image: image2,
                price: 23.00
            },
        ]
    },

    {
        title: "Create your gaming station",
        tag: false,
        tag_value: "",
        tag_color: '',
        items: [
            {
                image: "https://pairfy.dev/api/media/get-image/EYnWXKToEZdXrLpS4ndD.png",
                price: 30.00
            },
            {
                image: "https://pairfy.dev/api/media/get-image/GS7FdubBSzrf0fYIDwBm.png",
                price: 25.00
            }
        ]
    },

    {
        title: "Gym accessories",
        tag: false,
        tag_value: "",
        tag_color: '',
        items: [
            {
                image: image5,
                price: 34.00
            },
            {
                image: "https://pairfy.dev/api/media/get-image/EHngUJ00z9eKcNt1mQJN.png",
                price: 23.00
            }
        ]
    },

    {
        title: "Decorate your room",
        tag: false,
        tag_value: "",
        tag_color: '',
        items: [
            {
                image: "https://pairfy.dev/api/media/get-image/foFlPCtW9AKPtc3WeJRV.png",
                price: 34.00
            },
            {
                image: "https://pairfy.dev/api/media/get-image/6G2IzvMxpvsCjpdaf3iM.png",
                price: 23.00
            }
        ]
    },

])

</script>

<style lang="css" scoped>
.container {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(150px, auto);
    display: grid;
    gap: 1rem;
}

.box {
    border: 1px solid var(--border-a);
    background: var(--background-w);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    text-align: center;
    padding: 1rem;
    display: flex;
    width: 100%;
}

.box:nth-child(1) {
    grid-column: span 2;
}

.box:nth-child(4) {
    grid-column: span 1;
}

.box-head {
    justify-content: space-between;
    line-height: initial;
    width: inherit;
}

.box-head .tag {
    background: var(--purple-alpha);
    font-size: var(--text-size-0);
    color: var(--primary-a);
    margin-left: 0.75rem;
    border-radius: 6px;
    font-weight: 600;
    padding: 2px 4px;
}

.box-head .title {
    font-size: var(--text-size-3);
    font-weight: 600;
}

.box-head .arrow {
    font-weight: 100;
}

.box-content {
    justify-content: center;
    align-items: flex-end;
    width: inherit;
    display: flex;
    height: 100%;
}

.grid {
    justify-content: space-between;
    flex-wrap: wrap;
    width: inherit;
    display: flex;
    gap: 1rem;
}

.grid-item {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: auto;
    display: flex;
    height: 120px;
    font-weight: bold;
}

.grid-image {
    width: 100%;
    height: 100%;
}


</style>
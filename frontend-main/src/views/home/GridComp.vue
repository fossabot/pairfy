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
                        <div class="grid-price">
                            <span style="margin-top: auto;">${{ formatPriceToUSD(sub.price) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import image1 from '@/assets/icons/0.png'
import image2 from '@/assets/icons/1.png'
import image3 from '@/assets/icons/2.png'
import image4 from '@/assets/icons/3.png'
import image5 from '@/assets/icons/5.png'
import image6 from '@/assets/icons/6.png'
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
                price: 10.00
            },
            {
                image: image4,
                price: 60.00
            },
            {
                image: image5,
                price: 45.00
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
                image: image6,
                price: 14.00
            },
            {
                image: image2,
                price: 33.00
            }
        ]
    },

    {
        title: "Create your gaming station",
        tag: false,
        tag_value: "",
        tag_color: '',
        items: [
            {
                image: image1,
                price: 30.00
            },
            {
                image: image2,
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
                image: image1,
                price: 34.00
            },
            {
                image: image2,
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
                image: image1,
                price: 34.00
            },
            {
                image: image2,
                price: 23.00
            }
        ]
    },

])

</script>

<style lang="css" scoped>
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(150px, auto);
    gap: 1rem;
}

.box {
    background: var(--background-b);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    text-align: center;
    padding: 0 1rem;
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
    padding: 0.75rem 0;
    width: inherit;
}

.box-head .tag {
    font-size: var(--text-size-0);
    background: var(--red-alpha);
    color: var(--primary-a);
    margin-left: 0.75rem;
    border-radius: 6px;
    font-weight: 600;
    padding: 2px 4px;
}

.box-head .title {
    font-size: var(--text-size-2);
    font-weight: 700;
}

.box-head .arrow {
    font-weight: 100;
}

.box-content {
    width: inherit;
    height: 100%;
}

.grid {
    justify-content: center;
    flex-wrap: wrap;
    display: flex;
    padding: 0rem;
    gap: 1rem;
}

.grid-item {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100px;
    height: 100px;
    display: flex;
    font-weight: bold;
    border-radius: 12px;
}

.grid-image {
    background: var(--background-a);
    height: 70px;
}

.grid-price {
    color: var(--primary-a);
    justify-content: center;
    align-items: center;
    width: inherit;
    display: flex;
    height: 30px;
}

@media (max-width: 768px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
    }

    .item:nth-child(1) {
        grid-column: span 1;
    }
}

@media (max-width: 480px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>
<template>
    <div class="two">
        <div class="subcard left">
            <div class="title left">
               <span>Home</span>
            </div>

            <img class="minicard" v-for="item in itemList" :key="item" :src="item.image" :alt="item.alt" />
        </div>

        <div class="subcard right">
            <div class="title right">
                Garden
            </div>

            <img class="minicard" v-for="item in itemList" :key="item" :src="item.image" :alt="item.alt" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const itemList = ref([
    {
        title: "Libros educativos para niños...",
        image: "https://ae01.alicdn.com/kf/Sbeea600553724205913a3ec0acf666f2c.jpg_760x760q75.jpg",
        price: 8,
        alt: "image-alt",
        discount: true,
        discount_value: 12
    },
    {
        title: "Lenovo 2TB USB 3.0 Metal Flash...",
        image: "https://ae01.alicdn.com/kf/S0d3e660261154feea17c3afbf67410e4e.jpg_760x760q75.jpg",
        price: 5,
        alt: "image-alt",
        discount: true,
        discount_value: 15
    },
    {
        title: "The Psychology of Money Timeless...",
        image: "https://ae01.alicdn.com/kf/Sbeea600553724205913a3ec0acf666f2c.jpg_760x760q75.jpg",
        price: 15,
        alt: "image-alt",
        discount: false,
        discount_value: 11
    }
])

</script>

<style lang="css" scoped>
.two {
    padding: 1rem 0;
    width: 100%;
    max-width: 1600px;
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr 1fr;
}

.title {
    font-size: var(--text-size-4);
    grid-column: span 3;
    font-weight: 700;
    text-align: start;
}

.title.left{
    color: var(--text-w);
}

.title.right{
    color: var(--text-w);
}

.subcard {
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-auto-rows: auto;
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 20px;
    background: var(--background-a);
}

.subcard.left {
    background-image: linear-gradient(134deg, var(--soft-red-a), transparent  80%);
    background: var(--primary-a);
}

.subcard.right {
    background-image: linear-gradient(134deg, var(--soft-red-a), transparent 80%);
    background: var(--primary-a);
}

.minicard {
    background: var(--background-b);
    width: 100%;
    border-radius: 16px;
}

@media (max-width: 600px) {
    .grid-container {
        grid-template-columns: 1fr;
        /* 1 column for small screens */
    }
}
</style>
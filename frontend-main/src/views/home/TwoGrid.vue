<template>
    <div class="two">
        <div class="subcard left">
            <div class="head left">
                <div class="title">
                    <span>Cardano best sellers</span>
                    <span>Most purchased community products</span>
                </div>
                <div class="control flex">
                    <div class="button">
                        View More
                    </div>
                </div>
            </div>

            <img class="minicard" v-for="item in itemList" :key="item" :src="item.image" :alt="item.alt" />
        </div>

        <div class="subcard right">
            <div class="head left">
                <div class="title">
                    <span>Products of the week</span>
                    <span>The most purchased products.</span>
                </div>
                <div class="control flex">
                    <div class="button">
                        View More
                    </div>
                </div>
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
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
}

.head {
    font-size: var(--text-size-4);
    grid-column: span 3;
    font-weight: 700;
    text-align: start;
    display: flex;
    justify-content: space-between;
}

.head.left {
    color: var(--primary-a);
}

.head.right {
    color: var(--primary-a);
}

.button {
    border-radius: 999px;
    padding: 0.75rem 1.5rem;
    background: var(--primary-a);
    color: var(--text-w);
    font-size: var(--text-size-2);
    font-weight: 500;
    cursor: pointer;
}

.title {
    display: flex;
    flex-direction: column;
}

.title span:nth-child(2) {
    color: var(--text-a);
    font-size: var(--text-size-1);
    font-weight: 400;
}

.subcard {
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-auto-rows: auto;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border-radius: 20px;
    background: var(--background-b);
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
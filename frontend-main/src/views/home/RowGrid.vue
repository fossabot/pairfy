<template>
    <div class="row">
        <div class="subcard">
            <div class="title">
                <span>{{ title }}</span>
            </div>

            <img class="minicard" v-for="item in itemList" :key="item" :src="item.image" :alt="item.alt" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['title'])

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
    },
    {
        title: "Original Lenovo SD 1TB Micro TF...",
        image: "https://ae01.alicdn.com/kf/Sf5d0ad88d9a84e9798196cd3b3070f4aC.jpg_760x760q75.jpg",
        price: 25,
        alt: "image-alt",
        discount: true,
        discount_value: 10
    },
    {
        title: "The Psychology of Money Timeless...",
        image: "https://ae01.alicdn.com/kf/S84119b3c3608458384008cd3cc0f75a5k.jpg_760x760q75.jpg",
        price: 15,
        alt: "image-alt",
        discount: false,
        discount_value: 11
    },
    {
        title: "The Psychology of Money Timeless...",
        image: "https://ae01.alicdn.com/kf/S272f7ee82a884b4f92d1e1f56d118c14t.jpg_q75.jpg",
        price: 15,
        alt: "image-alt",
        discount: false,
        discount_value: 11
    },
])

</script>

<style lang="css" scoped>
.row {
    padding: 1rem 0;
    width: 100%;
    max-width: var(--body-a);
    display: flex;
    align-items: center;
}

.title {
    font-size: var(--text-size-3);
    grid-column: span 6;
    font-weight: 700;
    text-align: start;
    color: var(--text-w);
}


.subcard {
    text-align: center;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;
    grid-auto-rows: auto;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border-radius: 20px;
    background: var(--primary-a);
    background-image: var(--gradient-a);
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
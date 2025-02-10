<template>
    <div class="row">
        <div class="title flex">
            <span>{{ title }}</span>

            <div class="button flex">
                <i class="pi pi-arrow-right" />
            </div>
        </div>

        <div class="band flex">
            <div class="grid">
                <ItemCard v-for="item in itemList" :key="item" :content="item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ItemCard from '@/views/home/ItemCard.vue';
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
    margin-top: 1rem;
    width: 100%;
    max-width: var(--body-a);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: var(--primary-a);
    padding: 1rem;
}

.title {
    justify-content: space-between;    
    font-size: var(--text-size-3);
    color: var(--text-w);
    font-weight: 700;
    width: inherit;
}

.grid {
    text-align: center;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
    grid-auto-rows: auto;
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
    border-radius: 16px;
}


.button {
    justify-content: center;
    border-radius: 999px;
    font-size: var(--text-size-1);
    font-weight: 500;
    cursor: pointer;
    background: var(--primary-a);
    color: var(--text-w);
    width: 40px;
    height: 40px;
}

@media (min-width: 768px) {}

@media (min-width: 1200px) {}
</style>
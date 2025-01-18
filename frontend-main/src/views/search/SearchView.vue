<template>
    <div class="wrap flex">

        <div class="body flex">
            <PanelComp />
            <div class="content">
                <div class="banner">

                </div>

                <CardComp v-for="(item, index) in itemList" :key="index" :content="item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import PanelComp from '@/views/search/PanelComp.vue';
import CardComp from '@/views/search/CardComp.vue';
import { ref } from 'vue';

const itemList = ref([
    {
        brand: "apple",
        title: "Apple iPhone 13, 128GB, Green for AT&T (Renewed)",
        image: "https://m.media-amazon.com/images/I/71MHTD3uL4L._AC_UY218_.jpg",
        discount: true,
        discount_value: 10,
        price: 35
    },
    {
        brand: "apple",
        title: "SAMSUNG Galaxy S23 Ultra Series AI Phone, Unlocked Android Smartphone, 256GB Storage, 8GB RAM, 200MP Camera, Night Mode, Long Battery Life, S Pen, US Version, 2023, Green",
        image: "https://m.media-amazon.com/images/I/71MHTD3uL4L._AC_UY218_.jpg",
        discount: true,
        discount_value: 10,
        price: 35
    },
    {
        brand: "apple",
        title: "15 ProMax Smartphone, 6+256GB Unlocked Phone, Android 13.0, 48+108MP Zoom Camera, Mobile Phone with Build-in Pen,Long Battery Life 6800mAh, Dual SIM, 6.7“ HD Screen,5G/4G Phone (Natural Titanium)",
        image: "https://m.media-amazon.com/images/I/71MHTD3uL4L._AC_UY218_.jpg",
        discount: true,
        discount_value: 10,
        price: 35
    },
    {
        brand: "apple",
        title: "Apple iPhone 13, 128GB, Green for AT&T (Renewed)",
        image: "https://m.media-amazon.com/images/I/71MHTD3uL4L._AC_UY218_.jpg",
        discount: true,
        discount_value: 10,
        price: 35
    }
])
</script>

<style lang="css" scoped>
.wrap {
    width: 100%;
    border-top: 1px solid var(--border-a);
    justify-content: center;
}

.body {
    width: 100%;
    max-width: var(--body-a);
}

.content {
    width: inherit;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.banner {
    width: inherit;
    height: 50px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: var(--background-b);
}
</style>
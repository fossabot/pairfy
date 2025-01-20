<template>
    <div class="wrap flex">

        <div class="body flex">
            <PanelComp />
            <div class="content">
                <div class="banner flex">
                    <div class="counter">
                        1-24 of over 1,000 results for <span>"iphone"</span>
                    </div>
                    <Select class="selector" v-model="selectedSort" :options="sortOptions" size="small" showClear
                        optionLabel="name" placeholder="Sort by: Featured" checkmark :highlightOnSelect="false" />
                </div>
                <Divider />

                <template v-if="isLoading">
                    <Skeleton v-for="item in 5" :key="item" width="100%" height="250px" style="margin: 0.5rem 0;" />
                </template>

                <template v-else>   
                    <CardComp v-for="(item, index) in itemList" :key="index" :content="item" />   
                </template>
               
            </div>
        </div>
    </div>
</template>

<script setup>
import PanelComp from '@/views/search/PanelComp.vue';
import CardComp from '@/views/search/CardComp.vue';
import { ref } from 'vue';

const isLoading = ref(true);

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
]);

const selectedSort = ref();
const sortOptions = ref([
    { name: 'Price: Low To High', code: 'LH' },
    { name: 'Price: High To Low', code: 'HL' },
    { name: 'Rating', code: 'R' },
    { name: 'Best Seller', code: 'BS' },
    { name: 'Discount', code: 'DD' }
]);
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
    align-items: flex-start;
}

.content {
    width: inherit;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.banner {
    width: inherit;
    margin-top: 1rem;
}

.selector {
    margin-left: auto;
}

.counter {
    font-size: var(--text-size-1);
}

.counter span {
    font-weight: 600;
}
</style>
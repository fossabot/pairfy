<template>
    <div class="card-header">
        <span @click="backRoute">Back</span>
        <div class="flex">
            <i class="pi pi-angle-right" />
        </div>
        <span>Home</span>
        <div class="flex">
            <i class="pi pi-angle-right" />
        </div>
        <span>Categories</span>
        <div class="flex">
            <i class="pi pi-angle-right" />
        </div>
        <span>{{ getProductData?.category }}</span>
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';
import { useRouter } from 'vue-router';

const { getProductData } = productAPI();

const router = useRouter()

const backRoute = () => {
    router.go(-1)
}

</script>

<style lang="css" scoped>
.card-header {
    display: flex;
    align-items: center;
    font-size: var(--text-size-0);
    text-transform: capitalize;
    border-bottom: none;
    color: var(--text-b);
}

.card-header div {
    margin: 0 0.5rem;
    color: var(--text-b);
}

</style>
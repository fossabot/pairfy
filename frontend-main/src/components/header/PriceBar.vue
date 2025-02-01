<template>
    <div class="bar flex">
        <div class="bar-body flex">
            <span class="price">ADAUSD {{ formatPriceToUSD(getADAprice) }} </span>
            <span class="price">IUSD 1.0</span>
            <span class="price">USDM 1.0</span>
            <span class="price">USDA 1.0</span>
        </div>
    </div>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import { inject } from 'vue';

const { getADAprice } = headerAPI();

const { formatPriceToUSD } = inject('utils');
</script>

<style lang="css" scoped>
.bar {
    width: inherit;
    height: 2rem;
    border-bottom: 1px solid var(--border-a);
    justify-content: center;
}

.bar-body{
    justify-content: flex-end;
    max-width: var(--body-a);
    width: 100%;
}

.price{
    font-size: var(--text-size-0);
    font-weight: 500;
    margin-left: 2rem; 
}
</style>
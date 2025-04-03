<template>
    <div class="p-bar flex">
        <div class="p-bar-content flex">

            <LogoComp />
            <LocationComp />

            <span class="p-bar-price">Discount Liquidity: 1.000.000 ADA</span>
            <span class="p-bar-price">Volume 24h: 253.894 ADA</span>
            <span class="p-bar-price">ADAUSD {{ formatPriceToUSD(getADAprice) }} </span>
            <span class="p-bar-price">IUSD 1.0</span>
            <span class="p-bar-price">USDM 1.0</span>
            <span class="p-bar-price">USDA 1.0</span>
            <div class="p-bar-wallet flex" v-if="getCurrentUser">
                <span>
                    <i class="pi pi-wallet" />
                </span>
                <span class="p-bar-address">{{ getCurrentUser.address.slice(0, 20) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import LocationComp from '@/components/header/LocationComp.vue';
import headerAPI from "@/components/header/api/index";
import { inject } from 'vue';
import LogoComp from '../LogoComp.vue';

const { getADAprice, getCurrentUser } = headerAPI();

const { formatPriceToUSD } = inject('utils');
</script>

<style lang="css" scoped>
.p-bar {
    justify-content: center;
    color: var(--text-w);
    background: black;
    width: inherit;
    height: 2rem;
}

.p-bar-content {
    justify-content: flex-end;
    max-width: var(--body-a);
    width: 100%;
}

.p-bar-price,
.p-bar-address {
    font-size: var(--text-size-0);
    font-weight: 400;
    margin-left: 2rem;
}

.p-bar-wallet {
    font-weight: 400;
    margin-left: 2rem;
}

.p-bar-wallet i {
    font-size: var(--text-size-0);
    margin-right: 0.5rem;
}

.p-bar-address {
    margin: initial;
}

@media (max-width: 480px) {
    .p-bar {
        border-bottom: 1px solid var(--border-a);
        height: 2.5rem;
    }

    .p-bar-price,
    .p-bar-wallet {
        display: none;
    }

    .p-bar-content {
        max-width: 100%;
        padding: 0 0.5rem;
    }
}


@media (min-width: 481px) and (max-width: 767px) {}


@media (min-width: 768px) and (max-width: 1024px) {}


@media (min-width: 1025px) and (max-width: 1440px) {}


@media (min-width: 1441px) {}
</style>
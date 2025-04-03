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
                <span class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-wallet-cards-icon lucide-wallet-cards">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
                        <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
                    </svg>
                </span>
                <span style="margin-left: 0.5rem;">{{ getCurrentUser.address.slice(0, 20) }}</span>
            </div>

            <div class="p-bar-network flex">
                <span class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-arrow-down-up-icon lucide-arrow-down-up">
                        <path d="m3 16 4 4 4-4" />
                        <path d="M7 20V4" />
                        <path d="m21 8-4-4-4 4" />
                        <path d="M17 4v16" />
                    </svg>
                </span>
                <span style="margin-left: 0.5rem;">
                    Cardano Mainnet
                </span>
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
.p-bar-wallet,
.p-bar-network {
    font-size: var(--text-size-0);
    margin-left: 2rem;
    font-weight: 400;
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
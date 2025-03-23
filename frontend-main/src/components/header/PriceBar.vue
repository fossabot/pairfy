<template>
    <div class="bar flex">
        <div class="bar-content flex">
            <LocationComp />
            <span class="bar-price">Blackdays: 1.000.000 ADA</span>
            <span class="bar-price">Volume 24h: 253.894 ADA</span>
            <span class="bar-price">ADAUSD {{ formatPriceToUSD(getADAprice) }} </span>
            <span class="bar-price">IUSD 1.0</span>
            <span class="bar-price">USDM 1.0</span>
            <span class="bar-price">USDA 1.0</span>
            <div class="bar-wallet flex" v-if="getCurrentUser">
                <span>
                    <i class="pi pi-wallet" />
                </span>
                <span class="bar-address">{{ getCurrentUser.address.slice(0, 20) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import LocationComp from '@/components/header/LocationComp.vue';
import headerAPI from "@/components/header/api/index";
import { inject } from 'vue';

const { getADAprice, getCurrentUser } = headerAPI();

const { formatPriceToUSD } = inject('utils');
</script>

<style lang="css" scoped>
.bar {
    justify-content: center;
    width: inherit;
    height: 2rem;
}

.bar-content {
    justify-content: flex-end;
    max-width: var(--body-a);
    width: 100%;
}

.bar-price,
.bar-address {
    font-size: var(--text-size-0);
    font-weight: 400;
    margin-left: 2rem;
}

.bar-wallet {
    font-weight: 400;
    margin-left: 2rem;
}

.bar-wallet i {
    font-size: var(--text-size-0);
    margin-right: 0.5rem;
}

.bar-address {
    margin: initial;
}

@media (max-width: 480px) {
    .bar {
        border-bottom: 1px solid var(--border-a);
        height: 2.5rem;
    }

    .bar-price,
    .bar-wallet {
        display: none;
    }

    .bar-content {
        max-width: 100%;
        padding: 0 1rem;
    }
}


@media (min-width: 481px) and (max-width: 767px) {}


@media (min-width: 768px) and (max-width: 1024px) {}


@media (min-width: 1025px) and (max-width: 1440px) {}


@media (min-width: 1441px) {}
</style>
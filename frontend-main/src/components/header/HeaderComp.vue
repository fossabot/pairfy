<template>
    <header>
        <DrawerComp />
        <div class="header">
            <div class="header-col left">
                <div class="brand"></div>
            </div>
            <div class="header-col center">
                <SearchComp />
            </div>
            <div class="header-col right">

                <NotificationComp />

                <div v-if="!getCurrentUser" class="connect-wallet" @click="showPanel(true)">
                    Connect Wallet
                </div>

                <div v-if="getCurrentUser" class="connect-wallet" @click="showPanel(true)">
                    {{ getCurrentUser.address.slice(0, 15) }}
                </div>
            </div>
        </div>
        <section class="flex">
            <div class="menu">
                <div class="menu-col left">
                    <NavComp />
                </div>
                <div class="menu-col center">

                </div>
                <div class="menu-col right">
                    <div class="ada"> ADAUSD {{ getADAprice }}</div>
                    <div class="network"> {{ NETWORK }}</div>
                </div>
            </div>
        </section>
    </header>

</template>

<script setup>
import gql from 'graphql-tag';
import headerAPI from "@/components/header/api/index";
import DrawerComp from "@/components/header/DrawerComp.vue";
import SearchComp from "@/components/header/SearchComp.vue";
import NavComp from "@/components/header/NavComp.vue";
import NotificationComp from "./NotificationComp.vue";
import { useQuery } from '@vue/apollo-composable';
import { watch } from "vue";
import { NETWORK } from "@/api";


const { showPanel, getCurrentUser, setADAprice, getADAprice } = headerAPI();

const queryOptions = {
    pollInterval: 60_000,
    clientId: 'query'
}

const { result: onGetAssetPriceResult, onError: onGetAssetPriceError } = useQuery(gql`
      query getAssetPrice {
        getAssetPrice 
      }
`,
    null,
    queryOptions
);

watch(onGetAssetPriceResult, value => setADAprice(value.getAssetPrice));

onGetAssetPriceError(error => {
    console.log(error)
})

</script>

<style scoped>
header {
    background: var(--black-a);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid var(--border-b);
    font-size: var(--text-size-1);
}

section {
    width: inherit;
    justify-content: center;
}

.header {
    padding: 0.5rem 0;
}

.brand {
    cursor: pointer;
    min-height: 20px;
    width: 79px;
    background-image: url('../../assets/logo-white.png');
    background-repeat: repeat-x;
    background-position: 0px 0px;
    width: 200px;
    min-height: 33px;
    background-repeat: no-repeat;
}

.header,
.menu {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    width: 100%;
    padding: 1rem 2rem;
}

.header-col,
.menu-col {
    text-align: center;
    display: flex;
    align-items: center;
}

.header-col.right {
    justify-content: flex-end;
}

.header-col.left {
    justify-content: flex-start;
}

.menu {
    color: var(--text-w);
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
}

.menu-col.right {
    justify-content: flex-end;
}

.menu-col.left {
    justify-content: flex-start;
}

.connect-wallet {
    background: var(--primary-b);
    border-radius: 8px;
    padding: 0.5rem;
    min-width: 120px;
    font-weight: 500;
    color: var(--text-a);
    font-size: var(--text-size-1);
    cursor: pointer;
}

.ada {
    padding: 0 0.5rem;
    margin-left: 1rem;
    white-space: nowrap;
}

.network {
    color: var(--text-w);
    padding: 0 0.5rem;
    font-weight: 500;
    margin-left: 1rem;
    text-transform: capitalize;
}
</style>

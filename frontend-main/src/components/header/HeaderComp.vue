<template>
    <header>
        <DrawerComp />
        <div class="header">
            <div class="header-col left">
                <img class="logo" src="@/assets/logo-blue.png" alt="">
            </div>
            <div class="header-col center">
                <SearchComp />
            </div>
            <div class="header-col right">
                <OverlayBadge class="header-button" value="1" severity="danger" @click="toggle">
                    <div class="header-button-user flex">
                        <i class="pi pi-bell" />
                    </div>
                </OverlayBadge>

                <Popover ref="op">
                    <div class="notifications">
                        notification list
                    </div>
                </Popover>

                <div v-if="!getCurrentUser" class="connect-wallet" @click="showPanel(true)">
                    Connect Wallet
                </div>

                <div v-if="getCurrentUser" class="connect-wallet" @click="showPanel(true)">
                    {{ getCurrentUser.address.slice(0, 15) }}
                </div>
            </div>
        </div>

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
    </header>

</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import DrawerComp from "@/components/header/DrawerComp.vue";
import SearchComp from "@/components/header/SearchComp.vue";
import NavComp from "@/components/header/NavComp.vue";
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { ref, watch } from "vue";
import { NETWORK } from "@/api";

const { showPanel, getCurrentUser, setADAprice, getADAprice } = headerAPI();

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}

const queryOptions = {
    pollInterval: 60_000,
    clientId: 'query'
}

const { result: onGetAssetPriceResult, onError: onGetAssetPriceError } = useQuery(gql`
      query getUsers {
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
    background: var(--background-a);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--border-a);
    font-size: var(--text-size-a);
}

.header {
    padding: 0.75rem 0;
}

.logo {
    cursor: pointer;
}

.header,
.menu {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    width: 100%;
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
    padding: 0.75rem 0;
}

.menu-col.right {
    justify-content: flex-end;
}

.menu-col.left {
    justify-content: flex-start;
}

.connect-wallet {
    background: var(--primary-c);
    border-radius: 8px;
    padding: 0.5rem;
    min-width: 120px;
    font-weight: 500;
    color: var(--text-w);
    font-size: var(--text-size-a);
    cursor: pointer;
}

.header-button {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.notifications {
    width: 300px;
}

.ada {
    color: var(--text-b);
    padding: 0 0.5rem;
    margin-left: 1rem;
    white-space: nowrap;
}

.network {
    background: color-mix(in srgb, var(--p-green-50), transparent 5%);
    color: var(--green-a);
    padding: 0 0.5rem;
    margin-left: 1rem;
    border-radius: 4px;
}

.header-button-user img {
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0.5;
}
</style>

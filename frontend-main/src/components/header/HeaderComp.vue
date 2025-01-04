<template>
    <header>
        <DrawerComp />
        <div class="header">
            <div class="header-col left">
                <div class="brand" />
                <LocationComp />
            </div>
            <div class="header-col center">
                <SearchComp />
            </div>
            <div class="header-col right">

                <NotificationComp />

                <CartComp />

                <div class="connect-wallet" v-if="!getCurrentUser" @click="togglePanel(true)">
                    Connect Wallet
                </div>

                <div class="connect-wallet" v-if="getCurrentUser" @click="togglePanel(true)">
                    {{ getCurrentUser.address.slice(0, 15) }}
                </div>
            </div>
        </div>
        <section class="flex">
            <div class="menu">
                <NavComp />
            </div>
        </section>
    </header>

</template>

<script setup>
import gql from 'graphql-tag';
import headerAPI from "@/components/header/api/index";
import LocationComp from '@/components/header/LocationComp.vue';
import DrawerComp from "@/components/header/DrawerComp.vue";
import SearchComp from "@/components/header/SearchComp.vue";
import CartComp from "@/components/header/CartComp.vue";
import NavComp from "@/components/header/NavComp.vue";
import NotificationComp from "./NotificationComp.vue";
import { useQuery } from '@vue/apollo-composable';
import { onBeforeUnmount, watch, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()


const watchRoute = watch(
    () => route.params.country,
    (n, o) => {

        if (n === undefined && o === undefined) return;

        if (n) {
            let savedRoute = localStorage.getItem('location');

            if (savedRoute) {
                let parsed = JSON.parse(savedRoute);

                if (parsed.country.toLowerCase() !== n) {
                    return router.push({
                        name: 'home',
                        params: { country: parsed.country.toLowerCase() }
                    });
                }
            }
        }

        if (typeof n === 'string' && typeof o === 'string') {
            return location.reload()
        }

    },
    {
        immediate: true
    }
)

const { togglePanel, getCurrentUser, setADAprice } = headerAPI();

const queryOptions = {
    pollInterval: 60000,
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

const watchAssetPrice = watch(onGetAssetPriceResult, value => setADAprice(value.getAssetPrice));

onGetAssetPriceError(error => {
    console.log(error)
})


onBeforeUnmount(() => {
    watchAssetPrice()
    watchRoute()
    watchLocation()
})

</script>

<style scoped>
header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: var(--text-size-1);
    color: var(--text-w);
}

section {
    width: inherit;
    justify-content: center;
}

.header {
    padding: 0.75rem 0;
}

.brand {
    cursor: pointer;
    min-height: 20px;
    background-image: url('../../assets/logo-white.png');
    background-repeat: repeat-x;
    background-position: 0px 0px;
    width: 187px;
    min-height: 33px;
    background-repeat: no-repeat;
}

.header {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    max-width: 1600px;
    width: 100%;
}

.header-col {
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
    color: var(--text-a);
    padding: 0.75rem 0;
    max-width: 1600px;
    width: 100%;
}

.connect-wallet {
    background: var(--text-a);
    border-radius: 20px;
    height: 42px;
    padding: 0.6rem 1rem;
    min-width: 120px;
    font-weight: 600;
    font-size: var(--text-size-1);
    cursor: pointer;
    color: inherit;
}
</style>

<template>
    <header>
        <DrawerComp />
        <PriceBar />
        <div class="header">
            <div class="header-column left flex">
                <img class="brand" src="@/assets/logo.svg" alt="" @click="toHome">
            </div>
            <div class="header-column center flex">
                <SearchComp />
            </div>
            <div class="header-column right flex">
                <AgentButton />
            </div>
        </div>

        <NavComp />

    </header>

</template>

<script setup>
import gql from 'graphql-tag';
import headerAPI from "@/components/header/api/index";
import AgentButton from "@/components/header/AgentButton.vue";
import DrawerComp from "@/components/header/DrawerComp.vue";
import SearchComp from "@/components/header/SearchComp.vue";
import NavComp from "@/components/header/NavComp.vue";
import PriceBar from "@/components/header/PriceBar.vue";
import { useQuery } from '@vue/apollo-composable';
import { onBeforeUnmount, watch, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()

const router = useRouter()

const watchRoute = watch(
    () => route.params.country,
    (n, o) => {
        let currentRoute = router.currentRoute.value;

        if (n === undefined && o === undefined) return;

        if (n) {
            let savedRoute = localStorage.getItem('location');

            if (savedRoute) {
                let parsed = JSON.parse(savedRoute);

                if (parsed.country.toLowerCase() !== n) {
                    return router.push({
                        name: currentRoute.name,
                        params: {
                            ...currentRoute.params,
                            country: parsed.country.toLowerCase()
                        },
                        query: currentRoute.query
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

const { setADAprice } = headerAPI();

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

const watchAssetPrice = watch(onGetAssetPriceResult, value => setADAprice(value.getAssetPrice));

onGetAssetPriceError(error => {
    console.log(error)
})


const toHome = () => {
    router.push({
        name: 'home',
        query: {}
    })
}

onBeforeUnmount(() => {
    watchAssetPrice()
    watchRoute()
    watchLocation()
})

</script>

<style scoped>
header {
    width: 100%;
    display: flex;
    align-items: center;
    color: var(--text-a);
    flex-direction: column;
    justify-content: center;
    font-size: var(--text-size-1);
    border-bottom: 1px solid var(--border-a);
}

.header {
    padding: 0.75rem 0;
}

.brand {
    cursor: pointer;
    height: 2rem;
}

.header {
    grid-template-columns: 13% 74% 13%;
    max-width: var(--body-a);
    display: grid;
    width: 100%;
}

.header-column {
    align-items: center;
    text-align: center;
    display: flex;
    width: 100%;
}

.header-column.right {
    justify-content: flex-end;
}

.header-column.left {
    justify-content: flex-start;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {

    header {
        border: none;
    }

    .header {
        padding: initial;
        max-width: initial;
        display: flex;
    }

    .header-column.left {
        display: none;
    }

    .header-column.right {
        display: none;
    }

    .header-column.center {
        padding: 0 0.5rem;
    }

}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
    /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
    /* Styles for large screens */
}
</style>

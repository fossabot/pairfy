<template>
    <header>
        <DrawerComp />
        <div class="header">
            <div class="header-col left">
                <img class="brand" src="@/assets/logo-white.svg" alt="">

                <LocationComp />
            </div>
            <div class="header-col center">
                <SearchComp />
            </div>
            <div class="header-col right">

                <CartComp />

                <AgentButton />

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
import AgentButton from "@/components/header/AgentButton.vue";
import DrawerComp from "@/components/header/DrawerComp.vue";
import SearchComp from "@/components/header/SearchComp.vue";
import CartComp from "@/components/header/CartComp.vue";
import NavComp from "@/components/header/NavComp.vue";
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: var(--text-size-1);
    color: var(--text-a);
    background: var(--background-a);
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
    height: 60px;
}

.header {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    max-width: var(--body-a);
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
    color: inherit;
    padding: 0.75rem 0;
    max-width: var(--body-a);
    width: 100%;
}
</style>

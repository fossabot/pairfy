<template>
    <div class="wrap flex">

        <div class="body flex">
            <PanelComp />
            <div class="content">
                <div class="banner flex">
                    <div class="counter">
                        1-{{ productData.length }} of over 1,000 results for <span>"{{ searchKey }}"</span>
                    </div>
                    <Select class="selector" v-model="selectedSort" :options="sortOptions" optionLabel="name"
                        placeholder="Price: High To Low" checkmark :highlightOnSelect="false" @change="onSortChange" />
                </div>

                <template v-if="loading">
                    <Skeleton v-for="item in 5" :key="item" width="100%" height="220px" style="margin: 0.5rem 0;" />
                </template>

                <template v-else>
                    <CardComp v-for="(item, index) in productData" :key="index" :content="item._source" />
                </template>

            </div>
        </div>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import PanelComp from '@/views/search/PanelComp.vue';
import CardComp from '@/views/search/CardComp.vue';
import { useQuery } from '@vue/apollo-composable'
import { ref, watch, onBeforeUnmount, reactive, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { randomString } = inject('utils');

const theRoute = useRoute();

const router = useRouter();

const searchKey = ref("");

const loading = ref(false);

const queryEnabled = ref(false);

const productData = ref([]);

const currentRoute = ref(null);

const unwatchRoute = watch(
    theRoute,
    (route) => {
        if (!route.query.k) {
            router.push({
                name: 'home'
            })
        }

        console.log("ROUTE CHANGED");

        searchKey.value = route.query.k;

        currentRoute.value = route;

        loading.value = true;

        queryEnabled.value = true;
    },
    { immediate: true }
);


const variables = reactive({

    searchProductVariable: {
        text: searchKey.value,
        sku: {
            enabled: false,
            value: "",
        },
        brand: {
            enabled: false,
            value: "",
        },
        model: {
            enabled: false,
            value: "",
        },
        category: {
            enabled: false,
            value: "",
        },
        quality: {
            enabled: false,
            value: "",
        },
        discount: {
            enabled: false,
            value: false,
        },
        best_seller: {
            enabled: false,
            value: false,
        },
        price: {
            enabled: false,
            value: {
                gte: 0,
                lte: 0,
            },
        },
        sort: {
            price: "asc",
            rating: "desc",
            reviews: "desc",
            discount_value: "desc",
        },
        tag: "",
    }
});



const { result: searchProduct } = useQuery(gql`
      query ($searchProductVariable: SearchProductInput!) {
        searchProduct(searchProductInput: $searchProductVariable) {
          _source {    
            id
            name
            sku
            category
            brand
            model
            price
            quality
            image
            keywords
            rating
            reviews
            discount
            discount_value
            best_seller  
          }
        }
      }
    `,
    variables,
    () => ({
        enabled: queryEnabled.value,
        fetchPolicy: 'no-cache',
        clientId: 'query'
    })
);


const unwatchKey = watch(currentRoute.value,
    (route) => {
        console.log("KEY______", route.query)

        variables.searchProductVariable.text = route.query.k

        if (route.query.qy) {
            variables.searchProductVariable.quality.enabled = true;
            variables.searchProductVariable.quality.value = route.query.qy;
        } else {
            variables.searchProductVariable.quality.enabled = false;
        }


        if (route.query.cs) {
            variables.searchProductVariable.category.enabled = true;
            variables.searchProductVariable.category.value = route.query.cs;
        } else {
            variables.searchProductVariable.category.enabled = false;
        }

        if (route.query.gte) {
            variables.searchProductVariable.price.enabled = true;
            variables.searchProductVariable.price.value.gte = Number(route.query.gte);
        } else {
            variables.searchProductVariable.category.enabled = false;
        }

        if (route.query.lte) {
            variables.searchProductVariable.price.enabled = true;
            variables.searchProductVariable.price.value.lte = Number(route.query.lte);
        } else {
            variables.searchProductVariable.category.enabled = false;
        }

        if (route.query.sort) {
            const sortParam = route.query.sort.split(':');
            variables.searchProductVariable.sort[sortParam[0]] = sortParam[1]
        } else {
            variables.searchProductVariable.sort = {
                price: "asc",
                rating: "desc",
                reviews: "desc",
                discount_value: "desc",
            }
        }

        variables.searchProductVariable.tag = randomString(10);
    },
    { immediate: true }
);

const unwatchSearchProduct = watch(searchProduct, value => {
    console.log("RESULT", value);

    if (value) {

        let data = value.searchProduct

        productData.value = data;
    }

    loading.value = false;
});

const selectedSort = ref();

const sortOptions = ref([
    { name: 'Price: Low To High', code: 'price:asc' },
    { name: 'Price: High To Low', code: 'price:desc' },
    { name: 'Rating', code: 'rating:asc' },
    { name: 'Discount', code: 'discount_value:asc' }
]);

const onSortChange = (value) => {

    router.push({
        name: currentRoute.value.name,
        params: currentRoute.value.params,
        query: {
            ...currentRoute.value.query,
            sort: value.value.code
        }
    })
}

onBeforeUnmount(() => {
    unwatchRoute()
    unwatchKey()
    unwatchSearchProduct()
});
</script>

<style lang="css" scoped>
.wrap {
    width: 100%;
    justify-content: center;
    border-top: 1px solid var(--border-a);
}

.body {
    width: 100%;
    max-width: var(--body-a);
    align-items: flex-start;
}

.content {
    width: inherit;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.banner {
    width: inherit;
    padding: 1rem 0;
}

.selector {
    margin-left: auto;
}

.counter {
    font-size: var(--text-size-1);
}

.counter span {
    font-weight: 600;
}
</style>
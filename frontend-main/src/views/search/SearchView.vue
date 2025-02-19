<template>
    <div class="body">
        <div class="container flex">
            <PanelComp />
            <div class="content">
                <div class="banner flex">
                    <div class="counter">
                        1-{{ productData.length }} of over {{ productData.length }} results for <span>"{{ searchKey
                            }}"</span>
                    </div>
                    <Select class="selector" v-model="selectedSort" :options="sortOptions" optionLabel="name"
                        placeholder="Sort by" checkmark :highlightOnSelect="false" @change="onSortChange"
                        size="small" />
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
import { useRouter, useRoute } from 'vue-router';
import { ref, watch, onBeforeUnmount, reactive, inject } from 'vue';

const { randomString } = inject('utils');

const theRoute = useRoute();

const router = useRouter();

const searchKey = ref("");

const loading = ref(false);

const queryEnabled = ref(false);

const productData = ref([]);

const currentRoute = ref(null);

const selectedSort = ref({ name: 'Rating', code: 'rating:desc' });

const sortOptions = ref([
    { name: 'Price: Low To High', code: 'price:asc' },
    { name: 'Price: High To Low', code: 'price:desc' },
    { name: 'Rating', code: 'rating:desc' },
    { name: 'Discount', code: 'discount_value:desc' }
]);

const unwatchRoute = watch(
    theRoute,
    (route) => {
        if (!route.query.k) {
            router.push({
                name: 'home'
            })
        }

        searchKey.value = route.query.k;

        currentRoute.value = route;

        if (route.query.sort) {
            selectedSort.value = sortOptions.value.find(item => item.code === route.query.sort);
        } else {
            selectedSort.value = { name: 'Rating', code: 'rating:desc' };
        }

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
            price: {
                enabled: false,
                value: "asc"
            },
            rating: {
                enabled: true,
                value: "desc",
            },
            reviews: {
                enabled: false,
                value: "desc"
            },
            discount_value: {
                enabled: false,
                value: "desc",
            }
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
        variables.searchProductVariable.text = route.query.k

        if (route.query.qy) {
            variables.searchProductVariable.quality.enabled = true;
            variables.searchProductVariable.quality.value = route.query.qy;
        } else {
            variables.searchProductVariable.quality.enabled = false;
            variables.searchProductVariable.quality.value = "";
        }

        if (route.query.cs) {
            variables.searchProductVariable.category.enabled = true;
            variables.searchProductVariable.category.value = route.query.cs;
        } else {
            variables.searchProductVariable.category.enabled = false;
            variables.searchProductVariable.category.value = "";
        }

        if (route.query.gte) {
            variables.searchProductVariable.price.enabled = true;
            variables.searchProductVariable.price.value.gte = Number(route.query.gte);
        } else {
            variables.searchProductVariable.price.enabled = false;
            variables.searchProductVariable.price.value.gte = 0;
        }

        if (route.query.lte) {
            variables.searchProductVariable.price.enabled = true;
            variables.searchProductVariable.price.value.lte = Number(route.query.lte);
        } else {
            variables.searchProductVariable.price.enabled = false;
            variables.searchProductVariable.price.value.lte = 0;
        }

        if (route.query.sort) {
            const sortParam = route.query.sort.split(':');

            let scheme = {
                price: {
                    enabled: false,
                    value: "asc"
                },
                rating: {
                    enabled: false,
                    value: "desc",
                },
                reviews: {
                    enabled: false,
                    value: "desc"
                },
                discount_value: {
                    enabled: false,
                    value: "desc",
                }
            };

            scheme[sortParam[0]] = {
                enabled: true,
                value: sortParam[1]
            }

            variables.searchProductVariable.sort = scheme;
        } else {
            variables.searchProductVariable.sort = {
                price: {
                    enabled: false,
                    value: "asc"
                },
                rating: {
                    enabled: true,
                    value: "desc",
                },
                reviews: {
                    enabled: false,
                    value: "desc"
                },
                discount_value: {
                    enabled: false,
                    value: "desc",
                }
            };
        }

        variables.searchProductVariable.tag = randomString(10);
    },
    { immediate: true }
);

const unwatchSearchProduct = watch(searchProduct, value => {

    if (value) {

        let data = value.searchProduct

        productData.value = data;
    }

    loading.value = false;
});


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
.body {
    justify-content: center;
    display: flex;
}

.container {
    width: 100%;
    max-width: var(--body-a);
    align-items: flex-start;
    background: var(--background-a);
    margin-top: 1rem;
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
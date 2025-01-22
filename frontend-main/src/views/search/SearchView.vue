<template>
    <div class="wrap flex">

        <div class="body flex">
            <PanelComp />
            <div class="content">
                <div class="banner flex">
                    <div class="counter">
                        1-{{ productData.length }} of over 1,000 results for <span>"{{ searchKey }}"</span>
                    </div>
                    <Select class="selector" v-model="selectedSort" :options="sortOptions" showClear optionLabel="name"
                        placeholder="Sort by: Featured" checkmark :highlightOnSelect="false" />
                </div>
                <Divider />
               
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
import { ref, watch, onBeforeUnmount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();

const router = useRouter();

const searchKey = ref("");

const loading = ref(false);

const queryEnabled = ref(false);

const productData = ref([]);

const currentRoute = ref(null);

const unwatchRoute = watch(
    () => route.query,
    (query) => {
        if (!query.k) {
            router.push({
                name: 'home'
            })
        }

        searchKey.value = query.k;

        loading.value = true;

        queryEnabled.value = true;
    },
    { immediate: true }
);


const queryVariables = reactive({
    searchProductVariable: {
        text: searchKey.value,
        sku: {
            enabled: false,
            value: "6552953",
        },
        brand: {
            enabled: false,
            value: "samsung",
        },
        model: {
            enabled: false,
            value: "SP-LFF3CLAXXZA",
        },
        quality: {
            enabled: false,
            value: "new",
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
    queryVariables,
    () => ({
        enabled: queryEnabled.value,
        fetchPolicy: 'no-cache',
        clientId: 'query'
    })
);


const unwatchKey = watch(searchKey,
    (key) => {
        queryVariables.searchProductVariable.text = key
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
    { name: 'Price: Low To High', code: 'LH' },
    { name: 'Price: High To Low', code: 'HL' },
    { name: 'Rating', code: 'R' },
    { name: 'Best Seller', code: 'BS' },
    { name: 'Discount', code: 'DD' }
]);

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
    margin-top: 1rem;
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
<template>
    <ToastComp ref="toastRef" />
    <SearchSection1 />
    <FooterComp />
</template>

<script setup>
import { gql } from 'graphql-tag'

const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($searchProductsVariable: SearchProductsInput!) {
    searchProducts(searchProductsInput: $searchProductsVariable) {
        id
        thumbnail_url
        name
        price
        sku
        model
        brand
        category
        bullet_list
        color
        condition_
        origin
        city
        postal
        discount
        discount_value
        discount_percent
        created_at
    }
  }
`;

const route = useRoute()

const search = useSearchStore()

const toastRef = ref(null);

const { $apollo } = useNuxtApp()

const loading = ref(true)

const searchProductsError = ref(null)


watch(
    () => route.query.prompt,
    (prompt) =>
       {
        if(import.meta.client){
            searchProducts(prompt)
        }
       }
    ,
    { immediate: true }
)

async function searchProducts(prompt) {
    try {
        const { data } = await $apollo.query({
            query: SEARCH_PRODUCTS_QUERY,
            variables: {
                searchProductsVariable: {
                    prompt
                    //vectorial: route.query?.vectorial || false
                }
            },
            fetchPolicy: 'no-cache'
        })

        console.log(data)

        search.setResultData(data.searchProducts);
    } catch (err) {
        console.log(err)
        searchProductsError.value = err
        showGetProductError()
    } finally {
        loading.value = false
    }
}

function showGetProductError() {
    if (searchProductsError.value) displayMessage(searchProductsError.value, 'error')
}

function displayMessage(message, type, duration) {
    toastRef.value?.showToast(message, type, duration)
}

onMounted(() => {
    showGetProductError()
})
</script>

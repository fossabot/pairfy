<template>
  <main>
    <div class="box">
      Home viewwww

      {{ products }}
    </div>
  </main>
</template>


<style scoped>
.box {
  width: 500px;
  height: 500px;
  background: red;
}
</style>


<script setup>
import gql from 'graphql-tag'
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable'


const { result, variables, loading, error, refetch } = useQuery(gql`
query($getProductsVariable: GetProductsInput!){
    getProducts(getProductsInput: $getProductsVariable){
        id
        name
    }
}

`, {
  "getProductsVariable": {
    "page": 1
  }
}
)

function setPage(page) {
  variables.value = {
    page,
  }
}






const products = computed(() => result.value || "aasddddddd")
</script>
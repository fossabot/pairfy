<template>
  <div class="wrapper">
    <Toast closeIcon="pi-user" />
    <HeaderComp />
    <RouterView />
  </div>
</template>

<script setup>
import HeaderComp from '@/components/header/HeaderComp.vue';
import { RouterView } from 'vue-router';
import { ApolloClients } from '@vue/apollo-composable';
import { queryClient, gatewayClient } from './graphql/index';
import { provide } from 'vue';
import { formatWithDots, reduceByLength, formatCurrency, applyDiscount } from "./utils/index"

provide(ApolloClients, {
  default: queryClient,
  query: queryClient,
  gateway: gatewayClient
})


provide('utils', {
  formatWithDots,
  reduceByLength,
  formatCurrency,
  applyDiscount
});
</script>



<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all .2s ease;
  flex: 1;
  height: 100%;
}
</style>

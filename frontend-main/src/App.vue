<template>
  <div class="wrapper">
    <Toast/>
    <HeaderComp />
    <RouterView />
  </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import { RouterView } from 'vue-router';
import { ApolloClients } from '@vue/apollo-composable';
import { queryClient, gatewayClient } from './graphql/index';
import { provide } from 'vue';

provide(ApolloClients, {
  default: queryClient,
  query: queryClient,
  gateway: gatewayClient
})

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

.wrapper-content {}
</style>

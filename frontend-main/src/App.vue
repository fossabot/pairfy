<template>
  <div class="wrapper">
    <Toast closeIcon="pi-user" />
    <HeaderComp />
    <RouterView />
  </div>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import HeaderComp from '@/components/header/HeaderComp.vue';
import { copyToClipboard, convertLovelaceToUSD, convertLovelaceToADA, formatWithDots, reduceByLength, formatCurrency, applyDiscount, convertUSDToADA } from "./utils/index"
import { RouterView } from 'vue-router';
import { ApolloClients } from '@vue/apollo-composable';
import { walletClient } from "@/api/wallet";
import { queryClient, gatewayClient, notificationClient } from './graphql/index';
import { onBeforeUnmount, provide } from 'vue';



provide(ApolloClients, {
  default: queryClient,
  query: queryClient,
  gateway: gatewayClient,
  notification: notificationClient
})


provide('utils', {
  formatWithDots,
  reduceByLength,
  formatCurrency,
  applyDiscount,
  convertUSDToADA,
  convertLovelaceToADA,
  convertLovelaceToUSD,
  copyToClipboard
});

const { currentUser, currentSeller } = headerAPI();

const { startWalletService, stopWalletService } = walletClient();

currentUser()
  .then(() => console.info("USER_LOGGED"))
  .catch((err) => console.error(err));

currentSeller()
  .then(() => console.info("SELLER_LOGGED"))
  .catch((err) => console.error(err));

startWalletService()
  .then(() => console.info("WALLET_SERVICE"))
  .catch((err) => console.error(err));

  onBeforeUnmount(()=>{
    stopWalletService()
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
</style>

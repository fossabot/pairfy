<template>
    <div class="pad">
        <Button size="small" :disabled="disableReceived">
            Product Received
        </Button>

        <Button v-if="!currentState || currentState === 0" type="button" size="small" :disabled="disableReturn"
            @click="onReturnFunds" variant="text">
            <span>Return Funds</span>

            <span v-if="pendingCountdown !== '00:00'">
                {{ pendingCountdown }}
            </span>
        </Button>

        <Button v-if="currentState === 1" type="button" size="small" :disabled="disableCancel" @click="onReturnFunds"
            variant="text">
            <span>Cancel Order</span>

            <span v-if="shippingCountdown !== '00:00'">
                {{ shippingCountdown }}
            </span>
        </Button>

        <Button type="button" size="small" label="Appeal" :disabled="true" @click="onReturnFunds" variant="text"
            :loading="false" />

    </div>
</template>

<script setup>
import gql from 'graphql-tag'
import orderAPI from "@/views/order/api/index";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useMutation } from '@vue/apollo-composable'
import { useToast } from "primevue/usetoast";
import { balanceTx } from "@/api/wallet";

const toast = useToast();

const { getOrderData } = orderAPI();

const { mutate: returnFunds, loading: returnFundsLoading, onDone: onReturnFundsDone, onError: onReturnFundsError } = useMutation(gql`
      mutation($returnFundsVariable: ReturnFundsInput!) {
        returnFunds(returnFundsInput: $returnFundsVariable) {
          success
          payload {
            cbor
          }
        }
      }
`, {
    clientId: 'gateway'
})

const onReturnFunds = () => {
    returnFunds({
        "returnFundsVariable": {
            order_id: getOrderData.value.order.id
        }
    })
}

onReturnFundsDone(async result => {
    console.log(result.data);

    const response = result.data;

    if (response.returnFunds.success === true) {
        try {
            const { cbor } = response.returnFunds.payload;

            const txHash = await balanceTx(cbor);

            showSuccess(`Transaction submitted with hash: ${txHash}`, 120000);

            console.log(`Transaction submitted with hash: ${txHash}`);

        } catch (err) {
            console.error(err);

            showError(err);
        }
    }

})

onReturnFundsError(error => {
    showError(error)
})


const currentState = computed(() => getOrderData.value?.order?.contract_state || undefined)

const disableReturn = computed(() => pendingCountdown.value !== "00:00" || getOrderData.value?.order?.finished);

const disableCancel = computed(() => shippingCountdown.value !== "00:00" || getOrderData.value?.order?.finished);

const disableReceived = computed(() => getOrderData.value?.order?.finished || getOrderData.value?.order?.contract_state !== 2);

///////////////////////////////////////////////////////////////////

const pendingTimeLeft = ref(Date.now());

const pendingCountdown = computed(() => {
    if (pendingTimeLeft.value <= 0) return "00:00";

    const totalSeconds = Math.floor(pendingTimeLeft.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
});

let pendingInterval;

const updatePendingCountdown = () => {
    pendingTimeLeft.value = getOrderData.value?.order?.pending_until - Date.now();
};

///////////////////////////////////////////////////////////////////

const shippingTimeLeft = ref(Date.now());

const shippingCountdown = computed(() => {
    if (shippingTimeLeft.value <= 0) return "00:00";

    const totalSeconds = Math.floor(shippingTimeLeft.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
});

let shippingInterval;

const updateShippingCountdown = () => {
    shippingTimeLeft.value = getOrderData.value?.order?.shipping_until - Date.now();
};


/////////////////////////////////////////////////
const showSuccess = (content, time) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: time });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};


onMounted(() => {
    updatePendingCountdown();
    updateShippingCountdown();
    pendingInterval = setInterval(updatePendingCountdown, 1000);
    shippingInterval = setInterval(updateShippingCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(pendingInterval);
    clearInterval(shippingInterval);
});

</script>

<style lang="css" scoped>
.pad button {
    margin-right: 1rem;
    font-weight: 600;
}
</style>
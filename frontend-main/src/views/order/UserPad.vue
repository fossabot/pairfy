<template>
    <div class="pad">
        <Button size="small">
            Product Received
        </Button>

        <Button type="button" size="small" :disabled="disableReturn" @click="onReturnFunds" variant="text">

            <span>Return Funds</span>

            <span v-if="pendingCountdown !== '00:00'">
                {{ pendingCountdown }}
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
            order_id: getOrderData.value.id
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

            showSuccess(`Transaction submitted with hash: ${txHash}`, 20000);

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

const disableReturn = computed(() => pendingCountdown.value !== "00:00");

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
    pendingTimeLeft.value = getOrderData.value.pending_until - Date.now();
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
    pendingInterval = setInterval(updatePendingCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(pendingInterval);
});

</script>

<style lang="css" scoped>
.pad button {
    margin-right: 1rem;
    font-weight: 600;
}
</style>